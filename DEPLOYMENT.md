# DocRack — Remaining Deployment Steps (manual)

Most of the setup is already done. Current state:

| Done | What                                                                                                            |
| ---- | --------------------------------------------------------------------------------------------------------------- |
| ✅   | GCP project **docrack-web** created (account `games.wisemen@gmail.com`), billing linked                         |
| ✅   | APIs enabled (Cloud Run, Cloud Build, Artifact Registry, Sheets, Secret Manager)                                |
| ✅   | Service account **docrack-web-sa@docrack-web.iam.gserviceaccount.com** + local key at `secrets/gcp-sa-key.json` |
| ✅   | Spreadsheet **"DocRack Leads"** created in your Drive (tejushchauhan2002@gmail.com)                             |
| ✅   | Empty Secret Manager secret `resend-api-key` created, service account granted access                            |
| ✅   | Site deployed to Cloud Run (region asia-southeast1)                                                             |

What's left needs **you** (account sign-ups, browser verifications, DNS):

---

## Step 1 — Share the spreadsheet with the service account (30 seconds)

Open [DocRack Leads](https://docs.google.com/spreadsheets/d/1GvA62o61kaLAXDJ7WAmtnRpFtQcTQG8LJ7oMF9r5j9Q/edit)
→ **Share** → paste:

```
docrack-web-sa@docrack-web.iam.gserviceaccount.com
```

→ role **Editor** → untick "Notify people" → Share.

Then finish the tab setup (names the tabs and header rows) — run in the repo root,
or just ask Claude to run it:

```powershell
node scripts/setup-sheet.mjs
```

After this, form submissions on the live site start landing in the sheet.

## Step 2 — Resend account (email notifications)

1. Sign up free at <https://resend.com> **using tejushchauhan2002@gmail.com** — until your
   domain is verified (Step 4), Resend's test sender only delivers to your own account email.
2. Dashboard → API Keys → Create → copy the `re_...` key.
3. Put it in Secret Manager and attach it to the service:
   ```powershell
   gcloud secrets versions add resend-api-key --data-file=- --project docrack-web
   ```
   (paste the key, press Enter, then **Ctrl+Z and Enter** to finish input)
   ```powershell
   gcloud run services update docrack-web --project docrack-web --region asia-southeast1 --set-secrets "RESEND_API_KEY=resend-api-key:latest"
   ```

## Step 3 — Point docrack.ai at Cloud Run (GoDaddy DNS)

1. **Verify domain ownership** (opens a browser — must be you):

   ```powershell
   gcloud domains verify docrack.ai
   ```

   In Search Console choose the TXT-record method → add the TXT record at
   GoDaddy → My Products → docrack.ai → **DNS** → wait a few minutes → click Verify.
   Important: verify while signed in as **games.wisemen@gmail.com** (the mapping below
   checks ownership under the same account).

2. **Create the mappings:**

   ```powershell
   gcloud beta run domain-mappings create --service docrack-web --domain docrack.ai --project docrack-web --region asia-southeast1
   gcloud beta run domain-mappings create --service docrack-web --domain www.docrack.ai --project docrack-web --region asia-southeast1
   gcloud beta run domain-mappings describe --domain docrack.ai --project docrack-web --region asia-southeast1
   ```

   The `describe` output lists the exact DNS records.

3. **Add them at GoDaddy DNS.** Typically:
   - 4 × `A` records, Name `@`: `216.239.32.21`, `216.239.34.21`, `216.239.36.21`, `216.239.38.21`
   - 4 × `AAAA` records, Name `@`: `2001:4860:4802:32::15`, `:34::15`, `:36::15`, `:38::15`
   - 1 × `CNAME`, Name `www`, Value `ghs.googlehosted.com`

   **Delete** GoDaddy's default "Parked" A record on `@` and any existing `www` CNAME.

4. **Wait for the HTTPS certificate** (usually 15–60 min, up to 24 h). Check with the
   `describe` command. Then <https://docrack.ai> is live.

## Step 4 — Send emails from @docrack.ai (Resend domain verification)

1. Resend dashboard → **Domains** → Add Domain → `docrack.ai`. Add the DNS records it
   shows (DKIM TXT + MX/SPF on a `send` subdomain) at GoDaddy, then click **Verify**.
2. Switch the sender:
   ```powershell
   gcloud run services update docrack-web --project docrack-web --region asia-southeast1 --update-env-vars "EMAIL_FROM=DocRack <notifications@docrack.ai>"
   ```

## Step 5 — Final checks

- Submit both forms on <https://docrack.ai> → row appears in the sheet + email arrives.
- Logs: `gcloud run services logs read docrack-web --project docrack-web --region asia-southeast1 --limit 50`

---

## Quick reference

| Thing                       | Where                                                                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Leads spreadsheet           | [DocRack Leads](https://docs.google.com/spreadsheets/d/1GvA62o61kaLAXDJ7WAmtnRpFtQcTQG8LJ7oMF9r5j9Q/edit)                              |
| Cloud Run console           | <https://console.cloud.google.com/run?project=docrack-web>                                                                             |
| Redeploy after code changes | Merge to `main` — CI/CD deploys automatically (see below)                                                                              |
| Change notification address | `gcloud run services update docrack-web --project docrack-web --region asia-southeast1 --update-env-vars "NOTIFY_EMAIL=new@email.com"` |
| Estimated monthly cost      | ~$0–2 (scale-to-zero) + domain renewal                                                                                                 |

---

## Shipping changes (CI/CD)

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) handles deployment. To update the
live site:

```powershell
git switch -c my-change
# ...edit...
git commit -am "describe the change"
git push -u origin my-change
```

Open a PR to `main`. The pipeline runs `lint` → `check-types` → `build`; the deploy job is
**skipped**. Merge the PR and the same pipeline runs again, this time deploying to Cloud Run
(~4–5 min). `docrack.ai` serves the new revision as soon as it's ready — traffic is pinned to
`latestRevision`, so no manual traffic shift is needed.

**Deploys happen on `main` and nowhere else.** That's enforced in two independent places:

1. The deploy job's `if: github.ref == 'refs/heads/main' && github.event_name != 'pull_request'`.
2. GCP itself. The Workload Identity provider's attribute condition requires both
   `assertion.repository == 'Orbicle-Labs/DocRack-Web'` **and** `assertion.ref == 'refs/heads/main'`.
   A run on any other branch — or from any other repo — is refused at the token exchange, before
   it can reach Cloud Run at all, even if someone deleted the `if` above.

Auth is keyless (Workload Identity Federation), so there is no service-account key in GitHub and
nothing to rotate.

To redeploy without a code change: Actions tab → "DocRack CI/CD Web Pipeline" → **Run workflow**
on `main`.

### Break-glass manual deploy

If Actions is down, the pipeline is still the same single command:

```powershell
gcloud run deploy docrack-web --source . --project docrack-web --region asia-southeast1
```

### Rollback

```powershell
gcloud run revisions list --service docrack-web --project docrack-web --region asia-southeast1
gcloud run services update-traffic docrack-web --to-revisions REVISION_NAME=100 --project docrack-web --region asia-southeast1
```

### CI/CD infrastructure (already provisioned)

| Thing                    | Value                                                                                                                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deployer service account | `github-deployer@docrack-web.iam.gserviceaccount.com`                                                                                                                                                                     |
| Roles                    | `run.admin`, `cloudbuild.builds.editor`, `artifactregistry.writer` (project); `iam.serviceAccountUser` on `docrack-web-sa` and the compute default SA; `storage.objectAdmin` on `run-sources-docrack-web-asia-southeast1` |
| WIF provider             | `projects/876741720957/locations/global/workloadIdentityPools/github-pool/providers/github-provider`                                                                                                                      |
| Provider condition       | `assertion.repository == 'Orbicle-Labs/DocRack-Web' && assertion.ref == 'refs/heads/main'`                                                                                                                                |
| Impersonation binding    | `roles/iam.workloadIdentityUser` for `principalSet://…/attribute.repository/Orbicle-Labs/DocRack-Web`                                                                                                                     |

The binding uses an attribute-based `principalSet://`, **not** a `principal://…/subject/…`. The
GitHub `sub` claim (`repo:Orbicle-Labs/DocRack-Web:ref:refs/heads/main`) contains slashes, which do
not match as a subject principal — that misconfiguration fails at deploy time with
`Permission 'iam.serviceAccounts.getAccessToken' denied`. The branch restriction lives in the
provider condition instead, which rejects earlier anyway, at the token exchange.

Note: billing was unlinked from `orvyn-demo-2` to free a billing-account slot for this
project (Google caps small accounts at 3 billed projects). If you ever need that project
billed again, request a quota increase via Google's billing support form.

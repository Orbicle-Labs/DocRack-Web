# Website privacy notice — internal review draft

Publication HOLD. Owner and legal approval have not been supplied. This is not legal advice or an approved notice.

This notice concerns the public DocRack website and its enquiry forms. Product audit evidence and any product agreement have a separate scope.

## Information processed

A demo request contains your name, email, company and annual audit-volume selection. A support enquiry contains your name, email and message. The server adds a submission timestamp.

The website uses a hidden field and rate-limit counters to help detect repeated automated submissions. When a trusted ingress is configured, the counter key is HMAC-derived from its client IP; otherwise requests share a fallback identity. Counters contain no form data or raw IP. The optional Plausible adapter is disabled by default, pending owner configuration and processing review. Hosting-log retention and live provider operation remain unverified.

Claims: C39, C40, C41

## How enquiries are used

Enquiry details are used to handle demo requests, product questions and support messages. Do not include confidential audit records, borrower information, passwords or tokens.

Claims: C42, C43

## Configured recipients and services

The website saves accepted enquiries in Google Sheets. When configured, Resend sends an internal team notification containing enquiry details. A notification failure after storage does not undo the saved enquiry. The form does not send a visitor confirmation email.

Website hosting processes requests separately from product audit-evidence storage. This notice does not establish product data residency or model-provider terms.

Claims: C33, C43

## Retention and requests

Counters expire in application logic after the 20-minute demo or 30-minute support window. Configured Firestore TTL removes expired documents eventually, not at an exact deadline; TTL provisioning is pending. The bounded in-process fallback removes expired entries on requests and a one-minute cleanup timer while the process runs. Enquiry, provider and hosting retention periods require owner confirmation.

Use the support form for a website privacy question, without including sensitive supporting documents. The responsible legal entity, dedicated request contact, legal basis and request-handling procedure must be settled during final notice review.

Claims: C29, C40, C41

## Required before publication

Confirm responsible legal entity, owner/contact, applicable jurisdiction and legal basis, rights/request procedure, actual analytics and processor behaviour, enquiry/provider/hosting retention and deletion, rights to site materials, and approval date. No effective date or legal approval is inferred.

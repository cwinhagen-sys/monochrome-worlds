# Email templates

## `bonus-pdf.html` — the free-pages delivery email

Sent by the MailerLite automation that fires when someone joins the BonusPDF
group.

### Using it in MailerLite

1. Automations → your automation → **Email 1** → **Design email**
2. Pick the **Custom HTML** editor (not the drag-and-drop one)
3. Paste the whole contents of `bonus-pdf.html`, replacing what's there
4. Set the download link: search the pasted HTML for `free-pages.pdf` and point
   it at your real file
5. Save and close — the step turns green and the automation can be activated

### Notes

- Tables and inline styles are deliberate: email clients strip `<style>` blocks
  and support neither flexbox nor grid.
- The logo loads from `https://monochromeworlds.com/logo-email.png`
  (`public/logo-email.png`, ~105 KB — the full-size `logo.png` is ~1 MB, too
  heavy for an inbox).
- Cormorant Garamond isn't available in most email clients, so headlines fall
  back to Georgia, which carries the same feel.
- `{$unsubscribe}` is MailerLite's merge tag and must stay — an unsubscribe link
  is legally required and MailerLite rejects sends without one.

### Hosting the PDF here

Drop the file into `public/` (e.g. `public/free-pages.pdf`) and it's served at
`https://monochromeworlds.com/free-pages.pdf`. A link beats an attachment:
better deliverability, and the file can be swapped later without touching the
email.

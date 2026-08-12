# Email templates

Sending from a Gmail address puts these emails in spam. See
[DELIVERABILITY.md](./DELIVERABILITY.md) for setting up
`hello@monochromeworlds.com` as the sender.

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

### Testing the flow

Signing up twice with the same address proves nothing: an address already in
the group never fires "joins group" again, so the automation doesn't re-run.

Use plus-addressing for an endless supply of fresh addresses that all land in
the same inbox — `you+test1@gmail.com`, `you+test2@gmail.com`. Everything after
the `+` is ignored on delivery but makes a distinct subscriber. (Otherwise:
delete the subscriber in MailerLite and sign up again.)

When no email arrives, walk the chain in order — wherever it breaks is the
fault:

1. Subscriber appears under **Subscribers** (filter **All**, not Active) — if
   not, the site never reached MailerLite; check `/api/subscribe?groups=1`
2. **BonusPDF** is listed under their Groups — if not, `MAILERLITE_GROUP_ID` is
   pointing at the wrong group
3. The automation shows activity — if not, it isn't Active (pausing it to edit
   is easy to forget)
4. The automation reports a send — if not, the email step is incomplete
5. It's in the inbox, not spam — see [DELIVERABILITY.md](./DELIVERABILITY.md)

The **Test** button in the automation editor sends a preview to yourself. Good
for checking the design and where it lands, but it skips the site → group →
trigger path entirely.

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

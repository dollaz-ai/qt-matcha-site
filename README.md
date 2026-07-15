# qt matcha — website

The full qt matcha site: iron-conscious ceremonial matcha in three flagship flavors (vanilla, strawberry, coconut). Plain static HTML/CSS/JS — no build step, no framework. Whatever is in this repo is exactly what visitors see.

**Current placeholder deploy:** https://qtmatcha.higgsfield.app

## Pages

| File | What it is |
|---|---|
| `index.html` | Homepage (hero, scroll-pour animation, flavors, iron story) |
| `subscribe.html` | **The sales page** — flavor picker, flavor flight bundle, subscribe & save |
| `shop.html` | Catalog page, funnels to subscribe.html |
| `quiz.html` | "Glow check" quiz funnel |
| `glow.html` | VSL / video sales page |
| `science.html` | The iron story (education page) |
| `about.html`, `faq.html` | About + FAQ |
| `packaging.html` | Internal packaging vote page (unlinked) |
| `home-a/b/c.html` | Old scroll-animation drafts (unlinked, safe to delete later) |

`css/style.css` holds all shared styles. `images/` is product renders + UGC. `frames/` is the scroll-pour animation frame sequences — don't rename anything in there.

## How to publish this on our domain (one-time setup, ~10 minutes)

Use **Cloudflare Pages** (free, fast, free SSL):

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → sign up / log in.
2. **Create a project** → **Connect to Git** → authorize GitHub → pick this repo.
3. Build settings: framework preset **None**, build command **empty**, output directory **/** (root). Click **Deploy**.
4. You'll get a `*.pages.dev` URL immediately — the site is live there.
5. To use the real domain: in the Pages project go to **Custom domains** → add the domain → Cloudflare shows you the DNS record (a CNAME pointing to the pages.dev address) → add that record wherever the domain's DNS is managed. SSL is automatic.

(Netlify works identically if you prefer it: [app.netlify.com](https://app.netlify.com) → Add new site → Import from Git.)

**After setup, there is no deploy step.** Every commit to `main` republishes the site automatically within ~30 seconds.

## How to edit

- Any of us can edit through **Claude Code** ([claude.ai/code](https://claude.ai/code) or the CLI) — connect it to this repo and describe the change in plain English; it edits, commits, and the site updates.
- Or edit files directly on GitHub / any editor and push to `main`.

## Later: taking orders

The buy buttons are demo-only right now. When we're ready to sell, the lightest path is keeping this site exactly as-is and pointing the CTAs at a Shopify checkout (Buy Button / checkout links) — no rebuild needed. Decision for later.

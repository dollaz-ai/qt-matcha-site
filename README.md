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

## Later: taking orders with Shopify

The buy buttons are demo-only right now. Two ways to wire up real orders when we're ready — start with Path A, it's an afternoon of work and this site doesn't change at all.

### Path A — keep this site, use Shopify only for checkout (recommended first)

1. Create a Shopify store on the **Starter plan** (~$5/mo — no storefront needed, just products + checkout) at [shopify.com](https://www.shopify.com/starter).
2. In Shopify admin, add the products: vanilla / strawberry / coconut 10-packs ($24), the flavor flight bundle ($59). For subscribe & save 15%, install a subscriptions app from the Shopify app store (several free ones) and add a selling plan to each product.
3. For each product, grab its **checkout link** (Products → share/checkout permalink) — or use the **Buy Button** sales channel to generate an embeddable cart widget.
4. Replace the demo `href="#"` on the buy CTAs in `subscribe.html` (the `#main-cta` button) with those checkout links — the flavor picker's JS can map each flavor to its link. That's the whole integration; Shopify hosts the cart, payment, receipts, and shipping.

Result: this site stays exactly as designed, on our domain, still auto-publishing from GitHub. Shopify is invisible except at checkout.

### Path B — full Shopify migration (only if we outgrow Path A)

If we later want everything inside Shopify (inventory, discounts, analytics, apps), the site has to be ported into a **Shopify theme** (their Liquid template system) — the design carries over but it's a real rebuild, not a copy-paste:

1. Full Shopify plan (~$39/mo). Install the **Shopify CLI** (`npm i -g @shopify/cli`) and scaffold from a base theme (`shopify theme init`).
2. Port each page into the theme's `templates/` + `sections/` (Claude can do the porting — the CSS and images move over mostly unchanged).
3. Connect the theme repo to the store with the **Shopify GitHub integration** (Online Store → Themes → Add theme → Connect from GitHub). After that, commits to the theme branch auto-publish to the live store — same edit-on-GitHub workflow we have now.
4. Point the domain's DNS at Shopify instead of Cloudflare Pages.

Rule of thumb: Path A until order volume or ops pain says otherwise. Nothing in Path A is throwaway — the products, subscriptions, and Shopify account all carry into Path B.

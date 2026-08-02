(() => {
  "use strict";

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Shared chrome (this repo has no compatible shared script.js yet) ---------- */

  const initFooterYear = () => {
    const yearEl = document.querySelector("[data-year]");
    if (!yearEl) return;
    yearEl.textContent = String(new Date().getFullYear());
  };

  const initHeader = () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  };

  const initMobileNav = () => {
    const toggle = document.querySelector(".nav__toggle");
    const menu = document.querySelector(".nav__menu");
    if (!toggle || !menu) return;

    const menuLinks = menu.querySelectorAll("a");

    const setMenuOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 860) setMenuOpen(false);
      },
      { passive: true }
    );
  };

  /* ---------- Vault contents ----------
     The X Project's root container. TemptX and XPathways are separate
     projects living under this umbrella — TemptX keeps its own
     internal breakdown one level down. None of these link out to
     TemptX's own site from here, since that's a distinct product with
     its own domain, not a page inside this repo.
  */
  const ICONS = {
    folder: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6.5C3 5.67 3.67 5 4.5 5H9.5L11.5 7H19.5C20.33 7 21 7.67 21 8.5V17.5C21 18.33 20.33 19 19.5 19H4.5C3.67 19 3 18.33 3 17.5V6.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
    file: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 3.5H13L17.5 8V20.5H6.5V3.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M13 3.5V8H17.5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  };

  const VAULT = {
    name: "THE-X-PROJECT.vault",
    type: "folder",
    description: "Everything The X Project is building, in one place.",
    children: [
      {
        name: "Welcome.note",
        type: "file",
        description: "A short note on why this vault exists — and what it holds.",
      },
      {
        name: "TemptX",
        type: "folder",
        description: "The first project to come out of The X Project — a platform redefining trust, connection and professionalism. Already live, on its own site.",
        children: [
          {
            name: "District",
            type: "folder",
            description: "Beyond the directory — where listings become a living marketplace of discovery, commerce and community.",
            children: [
              {
                name: "Marketplace.hub",
                type: "file",
                description: "Where profiles and offerings become a browsable marketplace, not just a list.",
              },
              {
                name: "Commerce.ledger",
                type: "file",
                description: "Payments and offers, handled with the same trust as everything else on TemptX.",
              },
              {
                name: "Community.log",
                type: "file",
                description: "A shared space built around commerce and community, not just classifieds.",
              },
            ],
          },
          {
            name: "Xync",
            type: "folder",
            description: "Where interest becomes dialogue, quietly, before anyone arrives.",
            children: [
              {
                name: "Conversation.thread",
                type: "file",
                description: "Messaging that starts the moment interest does — before any meeting happens.",
              },
              {
                name: "Presence.status",
                type: "file",
                description: "Know who's available, without announcing who's watching.",
              },
              {
                name: "Privacy.note",
                type: "file",
                description: "Conversations built to stay exactly where they belong.",
              },
            ],
          },
          {
            name: "Profiles",
            type: "folder",
            description: "A professional presence that communicates who you are, and the signals that make engagement feel natural.",
            children: [
              {
                name: "Verified-Identity.card",
                type: "file",
                description: "Every profile backed by real verification, not just a badge.",
              },
              {
                name: "Availability.log",
                type: "file",
                description: "Clear signals on availability, so plans are never a guessing game.",
              },
              {
                name: "Reviews.feed",
                type: "file",
                description: "Feedback that builds trust, without turning profiles into a battleground.",
              },
            ],
          },
          {
            name: "Safety & Verification",
            type: "folder",
            description: "The systems working quietly behind every verified badge on TemptX.",
            children: [
              {
                name: "Identity-Checks.doc",
                type: "file",
                description: "The verification process behind every badge you see.",
              },
              {
                name: "Moderation.policy",
                type: "file",
                description: "Standards enforced consistently, not just written down.",
              },
              {
                name: "Verification Process",
                type: "folder",
                description: "The steps every profile moves through before it's marked verified.",
                children: [
                  { name: "Document-Check.step", type: "file", description: "Confirming identity documents are genuine and current." },
                  { name: "Liveness-Check.step", type: "file", description: "Confirming the person behind the profile, in real time." },
                  { name: "Approval.step", type: "file", description: "A final review before a profile goes live as verified." },
                ],
              },
            ],
          },
          {
            name: "Roadmap",
            type: "folder",
            description: "The path from foundation to global expansion.",
            children: [
              { name: "Foundation.phase", type: "file", description: "Laying the groundwork — architecture, trust systems and design." },
              { name: "Private-Beta.phase", type: "file", description: "A closed group of founding members shaping the platform first." },
              { name: "Public-Launch.phase", type: "file", description: "TemptX opens to everyone, built on what beta taught us." },
              { name: "Global-Expansion.phase", type: "file", description: "Beyond the first market, city by city." },
            ],
          },
          {
            name: "Founding Members",
            type: "folder",
            description: "Early entry, before the platform opens to the public.",
            children: [
              { name: "Access.pass", type: "file", description: "Early entry, before the platform opens to the public." },
              { name: "Perks.list", type: "file", description: "What founding members get that nobody else will." },
              { name: "Waitlist.form", type: "file", description: "The same waitlist found on TemptX's own site." },
            ],
          },
        ],
      },
      {
        name: "XPathways",
        type: "folder",
        description: "The next project taking shape under The X Project — not yet public.",
        children: [
          {
            name: "Status.note",
            type: "file",
            description: "Not yet public — check back as this one takes shape.",
          },
        ],
      },
    ],
  };

  const countContents = (node) => {
    let folders = 0;
    let files = 0;
    (node.children || []).forEach((child) => {
      if (child.type === "folder") {
        folders += 1;
        const nested = countContents(child);
        folders += nested.folders;
        files += nested.files;
      } else {
        files += 1;
      }
    });
    return { folders, files };
  };

  const initVault = () => {
    const stage = document.getElementById("vault-stage");
    const lockscreen = document.getElementById("vault-lockscreen");
    const metaEl = document.getElementById("vault-meta");
    const statusEl = document.getElementById("vault-status");
    const openBtn = document.getElementById("vault-open-btn");
    const explorer = document.getElementById("vault-explorer");
    const breadcrumbEl = document.getElementById("vault-breadcrumb");
    const listEl = document.getElementById("vault-list");
    const previewEl = document.getElementById("vault-preview");
    const countEl = document.getElementById("vault-count");

    if (!stage || !lockscreen || !openBtn || !explorer) return;

    const totals = countContents(VAULT);
    metaEl.textContent = `1 container · ${totals.folders} folders · ${totals.files} files`;

    let path = [VAULT];
    let selected = null;

    const renderPreview = (node, { isCurrentFolder } = {}) => {
      if (!node) {
        previewEl.innerHTML = `<p class="vault__preview-empty">Select a file or folder to preview it here.</p>`;
        return;
      }

      const kindLabel = node.type === "folder" ? "Folder" : "Document";
      const linkHtml = node.link
        ? `<a class="btn btn--secondary vault__preview-link" href="${node.link.href}">${node.link.label}</a>`
        : `<p class="vault__preview-note">${
            node.type === "folder"
              ? "Browse its contents on the left."
              : "Part of the experience above — full detail arrives with public launch."
          }</p>`;

      previewEl.innerHTML = `
        <div class="vault__preview-icon" data-kind="${node.type}">${ICONS[node.type]}</div>
        <p class="vault__preview-kind">${kindLabel}${isCurrentFolder ? " · currently open" : ""}</p>
        <h2 class="vault__preview-name">${node.name}</h2>
        <p class="vault__preview-desc">${node.description || ""}</p>
        ${linkHtml}
      `;
    };

    const renderBreadcrumb = () => {
      breadcrumbEl.innerHTML = path
        .map((node, index) => {
          const isLast = index === path.length - 1;
          return `
            <li class="vault__crumb-item">
              <button
                class="vault__crumb${isLast ? " is-current" : ""}"
                type="button"
                data-crumb-index="${index}"
                ${isLast ? 'aria-current="location"' : ""}
              >${node.name}</button>
            </li>
          `;
        })
        .join("");
    };

    const renderList = () => {
      const current = path[path.length - 1];
      const children = current.children || [];

      listEl.innerHTML = children
        .map((child, index) => {
          const kindLabel = child.type === "folder" ? "Folder" : "Document";
          return `
            <li>
              <button class="vault__row" type="button" data-index="${index}" data-type="${child.type}">
                <span class="vault__row-icon" data-kind="${child.type}">${ICONS[child.type]}</span>
                <span class="vault__row-text">
                  <span class="vault__row-name">${child.name}</span>
                  <span class="vault__row-kind">${kindLabel}</span>
                </span>
                ${child.type === "folder" ? `<span class="vault__row-chevron">${ICONS.chevron}</span>` : ""}
              </button>
            </li>
          `;
        })
        .join("");

      countEl.textContent = `${children.length} item${children.length === 1 ? "" : "s"}`;
    };

    const render = () => {
      renderBreadcrumb();
      renderList();
      renderPreview(selected || path[path.length - 1], { isCurrentFolder: !selected });
    };

    listEl.addEventListener("click", (event) => {
      const row = event.target.closest(".vault__row");
      if (!row) return;

      const current = path[path.length - 1];
      const index = Number(row.getAttribute("data-index"));
      const node = (current.children || [])[index];
      if (!node) return;

      if (node.type === "folder") {
        path = [...path, node];
        selected = null;
        render();
        listEl.querySelector(".vault__row")?.focus();
      } else {
        selected = node;
        renderPreview(node);
      }
    });

    breadcrumbEl.addEventListener("click", (event) => {
      const crumb = event.target.closest(".vault__crumb");
      if (!crumb) return;

      const index = Number(crumb.getAttribute("data-crumb-index"));
      if (Number.isNaN(index) || index >= path.length - 1) return;

      path = path.slice(0, index + 1);
      selected = null;
      render();
    });

    const openVault = () => {
      if (stage.dataset.state === "open") return;

      const reveal = () => {
        stage.dataset.state = "open";
        lockscreen.hidden = true;
        explorer.hidden = false;
        render();
      };

      if (prefersReducedMotion()) {
        reveal();
        return;
      }

      openBtn.disabled = true;
      statusEl.hidden = false;
      statusEl.textContent = "Unlocking…";
      lockscreen.classList.add("is-unlocking");

      window.setTimeout(reveal, 620);
    };

    openBtn.addEventListener("click", openVault);
  };

  const init = () => {
    initFooterYear();
    initHeader();
    initMobileNav();
    initVault();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

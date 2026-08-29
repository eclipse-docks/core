type DropdownItemElement = HTMLElement & { submenuOpen?: boolean };
type OpenDropdownElement = HTMLElement & { open?: boolean };

function isOpenDropdown(element: Element): element is OpenDropdownElement {
  if (element.localName !== "wa-dropdown") return false;
  const dropdown = element as OpenDropdownElement;
  return dropdown.open === true || dropdown.hasAttribute("open");
}

function elementsFromEventPath(event: Event): Element[] {
  const fromComposedPath = event
    .composedPath()
    .filter((node): node is Element => node instanceof Element);
  if (fromComposedPath.length > 0) return fromComposedPath;

  if (!(event.target instanceof Element)) return [];

  const path: Element[] = [];
  let current: Element | null = event.target;
  while (current) {
    path.push(current);
    const root = current.getRootNode();
    if (root instanceof ShadowRoot) {
      current = root.host;
      continue;
    }
    current = current.parentElement;
  }
  return path;
}

function elementTargetsOpenDropdown(element: Element): boolean {
  if (isOpenDropdown(element)) return true;
  if (element.localName !== "wa-dropdown-item") return false;
  const dropdown = element.closest("wa-dropdown");
  if (dropdown && isOpenDropdown(dropdown)) return true;
  const root = element.getRootNode();
  return root instanceof ShadowRoot
    && root.host instanceof Element
    && isOpenDropdown(root.host);
}

/** True when the event occurred inside a wa-dropdown that is currently open. */
export function eventTargetsOpenDropdown(event: Event): boolean {
  return elementsFromEventPath(event).some(elementTargetsOpenDropdown);
}

/** Prevents the browser context menu on open Docks popup lists (context menus, toolbar dropdowns). */
export function suppressNativeContextMenuInOpenDropdowns(event: Event): void {
  if (!event.cancelable || !eventTargetsOpenDropdown(event)) return;
  event.preventDefault();
}

let openDropdownContextMenuGuardInstalled = false;

export function installOpenDropdownNativeContextMenuGuard(): void {
  if (openDropdownContextMenuGuardInstalled || typeof document === "undefined") return;
  openDropdownContextMenuGuardInstalled = true;
  document.addEventListener("contextmenu", suppressNativeContextMenuInOpenDropdowns, { capture: true });
}

function visitElementTree(root: Node, visit: (element: Element) => void): void {
  if (root instanceof Element) {
    visit(root);
    if (root.shadowRoot) {
      visitElementTree(root.shadowRoot, visit);
    }
    for (const child of root.children) {
      visitElementTree(child, visit);
    }
  } else if (root instanceof DocumentFragment) {
    for (const child of root.children) {
      visitElementTree(child, visit);
    }
  }
}

/** Collect wa-dropdown-item elements under a menu root, including shadow DOM. */
export function collectDropdownItems(root: Element): DropdownItemElement[] {
  const items: DropdownItemElement[] = [];
  visitElementTree(root, (element) => {
    if (element.localName === "wa-dropdown-item") {
      items.push(element as DropdownItemElement);
    }
  });
  return items;
}

/** Close every open submenu except the one being activated. */
export function closeSiblingSubmenus(activeItem: Element, menuRoot: Element): void {
  queueMicrotask(() => {
    for (const item of collectDropdownItems(menuRoot)) {
      if (item !== activeItem && item.submenuOpen) {
        item.submenuOpen = false;
      }
    }
  });
}

type DropdownItemElement = HTMLElement & { submenuOpen?: boolean };

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
  for (const item of collectDropdownItems(menuRoot)) {
    if (item !== activeItem && item.submenuOpen) {
      item.submenuOpen = false;
    }
  }
}

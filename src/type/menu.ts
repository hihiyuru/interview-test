export interface MenuItems {
    key: string;
    text: string;
    children?: MenuItems[];
}

export interface MenuItem {
    key: string;
    text: string;
    uniqueId: string;
    depth: number;
    children?: Record<string, MenuItem>;
}

export interface MenuMap {
    [key: string]: MenuItem;
}
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const THEME_KEY = 'editorialLedgerTheme';

// ============================================
// Types
// ============================================

export interface ThemeColors {
	primary: string;
	primaryDark: string;
	primaryLight: string;
	primaryUltralight: string;
	primaryFaint: string;
	primaryMuted: string;
	accentBorder: string;
	bodyBg: string;
	shellBg: string;
}

export interface Theme {
	id: string;
	name: string;
	swatch: string;
	colors: ThemeColors;
}

export interface FontOption {
	id: string;
	name: string;
	stack: string;
	googleParam?: string;
}

export interface ThemeSettings {
	themeId: string;
	fontId: string;
}

// ============================================
// Themes
// ============================================

export const THEMES: Theme[] = [
	{
		id: 'classic',
		name: 'Classic',
		swatch: '#2b3f7f',
		colors: {
			primary: '#2b3f7f',
			primaryDark: '#223263',
			primaryLight: '#eef2ff',
			primaryUltralight: '#f8faff',
			primaryFaint: 'rgba(43,63,127,0.12)',
			primaryMuted: 'rgba(43,63,127,0.70)',
			accentBorder: 'rgba(129,181,246,0.30)',
			bodyBg: '#f2f4fa',
			shellBg: '#eceff8'
		}
	},
	{
		id: 'forest',
		name: 'Forest',
		swatch: '#166534',
		colors: {
			primary: '#166534',
			primaryDark: '#14532d',
			primaryLight: '#dcfce7',
			primaryUltralight: '#f0fdf4',
			primaryFaint: 'rgba(22,101,52,0.12)',
			primaryMuted: 'rgba(22,101,52,0.70)',
			accentBorder: 'rgba(74,180,111,0.30)',
			bodyBg: '#f0faf4',
			shellBg: '#e6f4ec'
		}
	},
	{
		id: 'ruby',
		name: 'Ruby',
		swatch: '#9b1c1c',
		colors: {
			primary: '#9b1c1c',
			primaryDark: '#7f1d1d',
			primaryLight: '#fee2e2',
			primaryUltralight: '#fef2f2',
			primaryFaint: 'rgba(155,28,28,0.12)',
			primaryMuted: 'rgba(155,28,28,0.70)',
			accentBorder: 'rgba(240,128,128,0.30)',
			bodyBg: '#fdf2f2',
			shellBg: '#f9e8e8'
		}
	},
	{
		id: 'violet',
		name: 'Violet',
		swatch: '#5b21b6',
		colors: {
			primary: '#5b21b6',
			primaryDark: '#4c1d95',
			primaryLight: '#ede9fe',
			primaryUltralight: '#f5f3ff',
			primaryFaint: 'rgba(91,33,182,0.12)',
			primaryMuted: 'rgba(91,33,182,0.70)',
			accentBorder: 'rgba(167,139,250,0.30)',
			bodyBg: '#f3f0fb',
			shellBg: '#ece8f7'
		}
	},
	{
		id: 'slate',
		name: 'Slate',
		swatch: '#1e3a5f',
		colors: {
			primary: '#1e3a5f',
			primaryDark: '#172d4a',
			primaryLight: '#dde8f5',
			primaryUltralight: '#f0f5fb',
			primaryFaint: 'rgba(30,58,95,0.12)',
			primaryMuted: 'rgba(30,58,95,0.70)',
			accentBorder: 'rgba(124,168,212,0.30)',
			bodyBg: '#f1f5f9',
			shellBg: '#e4eaf2'
		}
	},
	{
		id: 'copper',
		name: 'Copper',
		swatch: '#92400e',
		colors: {
			primary: '#92400e',
			primaryDark: '#78350f',
			primaryLight: '#fef3c7',
			primaryUltralight: '#fffbeb',
			primaryFaint: 'rgba(146,64,14,0.12)',
			primaryMuted: 'rgba(146,64,14,0.70)',
			accentBorder: 'rgba(245,158,11,0.30)',
			bodyBg: '#fdf6e3',
			shellBg: '#f7ecce'
		}
	},
	{
		id: 'ocean',
		name: 'Ocean',
		swatch: '#0e7490',
		colors: {
			primary: '#0e7490',
			primaryDark: '#0c5e73',
			primaryLight: '#cffafe',
			primaryUltralight: '#ecfeff',
			primaryFaint: 'rgba(14,116,144,0.12)',
			primaryMuted: 'rgba(14,116,144,0.70)',
			accentBorder: 'rgba(34,211,238,0.30)',
			bodyBg: '#f0fafb',
			shellBg: '#e4f5f7'
		}
	},
	{
		id: 'rose',
		name: 'Rose',
		swatch: '#be185d',
		colors: {
			primary: '#be185d',
			primaryDark: '#9d174d',
			primaryLight: '#fce7f3',
			primaryUltralight: '#fdf2f8',
			primaryFaint: 'rgba(190,24,93,0.12)',
			primaryMuted: 'rgba(190,24,93,0.70)',
			accentBorder: 'rgba(244,114,182,0.30)',
			bodyBg: '#fdf2f8',
			shellBg: '#f9e6f0'
		}
	},
	{
		id: 'charcoal',
		name: 'Charcoal',
		swatch: '#374151',
		colors: {
			primary: '#374151',
			primaryDark: '#1f2937',
			primaryLight: '#e5e7eb',
			primaryUltralight: '#f3f4f6',
			primaryFaint: 'rgba(55,65,81,0.12)',
			primaryMuted: 'rgba(55,65,81,0.70)',
			accentBorder: 'rgba(156,163,175,0.30)',
			bodyBg: '#f3f4f6',
			shellBg: '#e9eaed'
		}
	},
	{
		id: 'teal',
		name: 'Teal',
		swatch: '#0f766e',
		colors: {
			primary: '#0f766e',
			primaryDark: '#115e59',
			primaryLight: '#ccfbf1',
			primaryUltralight: '#f0fdfa',
			primaryFaint: 'rgba(15,118,110,0.12)',
			primaryMuted: 'rgba(15,118,110,0.70)',
			accentBorder: 'rgba(45,212,191,0.30)',
			bodyBg: '#f0fdf9',
			shellBg: '#e2f8f4'
		}
	},
	{
		id: 'sunset',
		name: 'Sunset',
		swatch: '#c2410c',
		colors: {
			primary: '#c2410c',
			primaryDark: '#9a3412',
			primaryLight: '#ffedd5',
			primaryUltralight: '#fff7ed',
			primaryFaint: 'rgba(194,65,12,0.12)',
			primaryMuted: 'rgba(194,65,12,0.70)',
			accentBorder: 'rgba(251,146,60,0.30)',
			bodyBg: '#fef6ee',
			shellBg: '#fdebd6'
		}
	}
];

// ============================================
// Fonts
// ============================================

export const FONTS: FontOption[] = [
	{ id: 'inter', name: 'Inter', stack: "'Inter', sans-serif" },
	{
		id: 'roboto',
		name: 'Roboto',
		stack: "'Roboto', sans-serif",
		googleParam: 'Roboto:wght@300;400;500;700'
	},
	{
		id: 'lato',
		name: 'Lato',
		stack: "'Lato', sans-serif",
		googleParam: 'Lato:wght@300;400;700'
	},
	{
		id: 'montserrat',
		name: 'Montserrat',
		stack: "'Montserrat', sans-serif",
		googleParam: 'Montserrat:wght@300;400;500;600;700'
	},
	{
		id: 'playfair',
		name: 'Playfair',
		stack: "'Playfair Display', serif",
		googleParam: 'Playfair+Display:wght@400;500;600;700'
	},
	{
		id: 'opensans',
		name: 'Open Sans',
		stack: "'Open Sans', sans-serif",
		googleParam: 'Open+Sans:wght@300;400;500;600;700'
	},
	{
		id: 'merriweather',
		name: 'Merriweather',
		stack: "'Merriweather', serif",
		googleParam: 'Merriweather:wght@300;400;700'
	},
	{
		id: 'sourcesans',
		name: 'Source Sans',
		stack: "'Source Sans 3', sans-serif",
		googleParam: 'Source+Sans+3:wght@300;400;500;600;700'
	}
];

// ============================================
// Default + load from storage
// ============================================

function loadThemeSettings(): ThemeSettings {
	if (!browser) return { themeId: 'classic', fontId: 'inter' };
	try {
		const saved = localStorage.getItem(THEME_KEY);
		if (!saved) return { themeId: 'classic', fontId: 'inter' };
		return { themeId: 'classic', fontId: 'inter', ...JSON.parse(saved) };
	} catch {
		return { themeId: 'classic', fontId: 'inter' };
	}
}

// ============================================
// Stores
// ============================================

export const themeSettings = writable<ThemeSettings>(loadThemeSettings());

if (browser) {
	themeSettings.subscribe(($s) => {
		try {
			localStorage.setItem(THEME_KEY, JSON.stringify($s));
		} catch {
			// storage unavailable
		}
	});
}

export const currentTheme = derived(themeSettings, ($s) => {
	return THEMES.find((t) => t.id === $s.themeId) ?? THEMES[0];
});

export const currentFont = derived(themeSettings, ($s) => {
	return FONTS.find((f) => f.id === $s.fontId) ?? FONTS[0];
});

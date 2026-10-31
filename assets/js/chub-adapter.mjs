// KM-authored Chub compatibility CSS. Keep this output stable and self-contained.
export function chubAdapterFixes(){
 return "\n/* Chub compatibility adapter (phone typography & native token sync) */\nhtml:not(#_){--message-font-size:var(--c-fs)!important;--message-line-height:var(--c-lh)!important;--dark-primary-color:var(--c-btn)!important;--light-primary-color:var(--c-btn)!important;--bright-icon:var(--c-accent)!important}\nhtml:is(.light-mode-override,.light-mobile-override){color-scheme:light}\n:where(html:is(.light-mode-override,.light-mobile-override)){--c-ga:.85}\n.msg-mkdn-container:not(#_){font-size:var(--c-fs)!important;line-height:var(--c-lh)!important}\n";
}

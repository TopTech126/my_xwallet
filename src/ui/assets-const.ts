import {
  HARDWARE_KEYRING_TYPES,
  IWalletBrandContent,
  KEYRING_CLASS,
  WALLET_BRAND_CONTENT,
  WALLET_BRAND_TYPES,
} from '../constant';

import IconEN from 'ui/assets/langs/en.svg';
import IconAmber from 'ui/assets/walletlogo/amber.svg';
import LogoAmber from 'ui/assets/walletlogo/amber.svg';
import {
  default as IconBitBox02,
  default as IconBitBox02WithBorder,
} from 'ui/assets/walletlogo/bitbox.svg';
import IconCobo from 'ui/assets/walletlogo/cobo.svg';
import LogoCobo from 'ui/assets/walletlogo/cobo.svg';
import IconFireblocksWithBorder from 'ui/assets/walletlogo/fireblocks.svg';
import IconFireblocks from 'ui/assets/walletlogo/fireblocks.svg';
import IconGnosis from 'ui/assets/walletlogo/gnosis.svg';
import IconGridPlus from 'ui/assets/walletlogo/gridplus.svg';
import IconImtoken from 'ui/assets/walletlogo/imtoken.svg';
import LogoImtoken from 'ui/assets/walletlogo/imtoken.svg';
import IconJade from 'ui/assets/walletlogo/jade.svg';
import LogoJade from 'ui/assets/walletlogo/jade.svg';
import LogoKeystone from 'ui/assets/walletlogo/keystone.svg';
import LogoAirGap from 'ui/assets/walletlogo/airgap.svg';
import LogoLedgerDark from 'ui/assets/walletlogo/ledger.svg';
import LogoLedgerWhite from 'ui/assets/walletlogo/ledger.svg';
import IconMath from 'ui/assets/walletlogo/math.svg';
import LogoMath from 'ui/assets/walletlogo/math.svg';
import IconMetaMask from 'ui/assets/walletlogo/metamask.svg';
import IconMnemonicInk from 'ui/assets/walletlogo/mnemonic-ink.svg';
import IconMnemonicWhite from 'ui/assets/walletlogo/IconMnemonic-white.svg';
import LogoMnemonic from 'ui/assets/walletlogo/mnemoniclogo.svg';
import IconOnekey from 'ui/assets/walletlogo/onekey.svg';
import IconOneKey18 from 'ui/assets/walletlogo/onekey.svg';
import LogoOnekey from 'ui/assets/walletlogo/onekey.svg';
import IconPrivateKeyWhite from 'ui/assets/walletlogo/private-key-white.svg';
import IconPrivateKeyInk from 'ui/assets/walletlogo/privatekey-ink.svg';
import LogoPrivateKey from 'ui/assets/walletlogo/privatekeylogo.svg';
import LogoTp from 'ui/assets/walletlogo/tp.svg';
import IconTokenpocket from 'ui/assets/walletlogo/tp.svg';
import IconTrezor from 'ui/assets/walletlogo/trezor.svg';
import IconTrezor24Border from 'ui/assets/walletlogo/trezor.svg';
import IconTrezor24 from 'ui/assets/walletlogo/trezor.svg';
import LogoTrezor from 'ui/assets/walletlogo/trezor.svg';
import LogoTrust from 'ui/assets/walletlogo/trust.svg';
import IconTrust from 'ui/assets/walletlogo/trust.svg';
import LogoCoolWallet from 'ui/assets/walletlogo/coolwallet.svg';
import IconWatchPurple from 'ui/assets/walletlogo/watch-purple.svg';
import IconWatchWhite from 'ui/assets/walletlogo/IconWatch-white.svg';
import LogoDefiant from 'ui/assets/walletlogo/defiant.svg';
import LogoDefiantWhite from 'ui/assets/walletlogo/defiant.svg';
import LogoWalletConnect from 'ui/assets/walletlogo/walletconnect28.svg';
import IconWalletConnect from 'ui/assets/walletlogo/walletconnect28.svg';

export const KEYRING_ICONS = {
  [KEYRING_CLASS.MNEMONIC]: IconMnemonicInk,
  [KEYRING_CLASS.PRIVATE_KEY]: IconPrivateKeyInk,
  [KEYRING_CLASS.WATCH]: IconWatchPurple,
  [HARDWARE_KEYRING_TYPES.BitBox02.type]: IconBitBox02,
  [HARDWARE_KEYRING_TYPES.Ledger.type]: LogoLedgerWhite,
  [HARDWARE_KEYRING_TYPES.Onekey.type]: LogoOnekey,
  [HARDWARE_KEYRING_TYPES.Trezor.type]: IconTrezor24,
  [HARDWARE_KEYRING_TYPES.GridPlus.type]: IconGridPlus,
  [HARDWARE_KEYRING_TYPES.Keystone.type]: LogoKeystone,
};

export const KEYRING_ICONS_WHITE = {
  [KEYRING_CLASS.MNEMONIC]: IconMnemonicWhite,
  [KEYRING_CLASS.PRIVATE_KEY]: IconPrivateKeyWhite,
  [KEYRING_CLASS.WATCH]: IconWatchWhite,
  [HARDWARE_KEYRING_TYPES.BitBox02.type]: IconBitBox02,
  [HARDWARE_KEYRING_TYPES.Ledger.type]: LogoLedgerWhite,
  [HARDWARE_KEYRING_TYPES.Onekey.type]: LogoOnekey,
  [HARDWARE_KEYRING_TYPES.Trezor.type]: IconTrezor24,
  [HARDWARE_KEYRING_TYPES.GridPlus.type]: IconGridPlus,
  [HARDWARE_KEYRING_TYPES.Keystone.type]: LogoKeystone,
};
export const KEYRING_PURPLE_LOGOS = {
  [KEYRING_CLASS.MNEMONIC]: IconMnemonicInk,
  [KEYRING_CLASS.PRIVATE_KEY]: IconPrivateKeyInk,
  [KEYRING_CLASS.WATCH]: IconWatchPurple,
};

export const KEYRINGS_LOGOS = {
  [KEYRING_CLASS.MNEMONIC]: LogoMnemonic,
  [KEYRING_CLASS.PRIVATE_KEY]: LogoPrivateKey,
  [KEYRING_CLASS.WATCH]: IconWatchWhite,
  [HARDWARE_KEYRING_TYPES.BitBox02.type]: IconBitBox02WithBorder,
  [HARDWARE_KEYRING_TYPES.Ledger.type]: LogoLedgerWhite,
  [HARDWARE_KEYRING_TYPES.Onekey.type]: IconOneKey18,
  [HARDWARE_KEYRING_TYPES.Trezor.type]: IconTrezor24Border,
  [HARDWARE_KEYRING_TYPES.GridPlus.type]: IconGridPlus,
  [HARDWARE_KEYRING_TYPES.Keystone.type]: LogoKeystone,
};

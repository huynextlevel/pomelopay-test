import { StyleSheet } from 'react-native';

import { colors } from 'src/styles';

export default StyleSheet.create({
  coinListItemContainer: {
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  coinSymbolText: {
    fontSize: 19,
    fontWeight: '600',
  },
  coinSubText: {
    fontSize: 13,
    color: colors.secondaryGray
  },
  lastPriceContainer: {
    alignItems: 'flex-end',
  },
  priceChangeContainer: {
    width: 100,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginLeft: 10,
  },
  priceChangeText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white
  },
});

import { StyleSheet } from 'react-native';

import { colors } from 'src/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.white
  },
  listWrapperContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 5,
  },
  filterItemContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 3,
  },
  filterItemText: {
    fontWeight: '600',
    fontSize: 14,
  },
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.secondaryGray
  }
});

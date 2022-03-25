import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import { globalStyles, colors } from 'src/styles';
import styles from './styles';
import {
  intToString,
  customSymbol,
  checkIncrease,
  round2Decimals,
  numberWithCommas,
  removeTraillingZero,
} from 'src/utils';

export const CoinListItem = React.memo(({ item, filterValue }) => {
  return (
    <View style={[globalStyles.rowContainer, styles.coinListItemContainer]}>
      <View style={[globalStyles.columnContainer]}>
        <Text style={styles.coinSymbolText}>
          {customSymbol(item.symbol, filterValue).symbol} <Text style={{ fontSize: 14 }}>{customSymbol(item.symbol, filterValue).filter}</Text>
        </Text>
        <Text style={styles.coinSubText}>
          Vol {intToString(item.volume)}
        </Text>
      </View>
      <View style={globalStyles.rowContainer}>
        <View style={[globalStyles.columnContainer, styles.lastPriceContainer]}>
          <Text style={[styles.coinSymbolText, { color: checkIncrease(item.priceChangePercent) ? colors.green : colors.red }]}>
            {removeTraillingZero(item.lastPrice)}
          </Text>
        </View>
        <View style={[styles.priceChangeContainer, { backgroundColor: checkIncrease(item.priceChangePercent) ? colors.green : colors.red }]}>
          <Text style={[styles.priceChangeText]}>
            {checkIncrease(item.priceChangePercent) && '+' }{round2Decimals(item.priceChangePercent)}%
          </Text>
        </View>
      </View>
    </View>
  )
});

CoinListItem.propTypes = {
  item: PropTypes.object,
  filterValue: PropTypes.string,
};

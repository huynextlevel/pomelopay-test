import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { globalStyles, colors } from 'src/styles';
import {
  filterData,
} from 'src/utils';
import * as appActions from 'src/store/action/app';
import CoinListItem from 'src/components/CoinListItem';

const SortIcon = React.memo(({ isIncrease }) => (
  <Icon
    name={isIncrease ? 'arrow-drop-up' : 'arrow-drop-down'}
    size={20}
    style={{ color: colors.black }}
  />
));

SortIcon.propTypes = {
  isIncrease: PropTypes.bool,
};

const FilterItem = React.memo(({ isSubFilter, item, selectedValue, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.filterItemContainer, {
      backgroundColor: item.value === selectedValue ? isSubFilter ? colors.third : colors.primary : 'transparent',
      marginRight: isSubFilter ? 10 : 0,
    }]}
  >
    <Text style={[styles.filterItemText, {
      color: item.value === selectedValue ? colors.white : colors.black
    }]}>
      {item.title}
    </Text>
  </TouchableOpacity>
));

FilterItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  isSubFilter: PropTypes.bool,
  selectedValue: PropTypes.string,
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const coinList = useSelector(state => state.app.coinList);
  const [coinData, setCoinData] = useState([]);
  const [tempCoinData, setTempCoinData] = useState([]);
  const [filterSelected, setFilterSelected] = useState('BUSD"');
  const [subFilterSelected, setSubFilterSelected] = useState('');
  const [sortType, setSortType] = useState('percent');
  const [subFilterData, setSubFilterData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isIncrease, setIsIncrease] = useState(false);

  useLayoutEffect(() => {
    if (coinList) {
      if (sortType !== 'percent') setSortType('percent');
      if (isRefresh) setIsRefresh(false);
      if (isIncrease) setIsIncrease(false);

      const filtererArr = coinList.filter((i) => i.lastPrice !== '0.00000000');
      const filterBySelectedValue = filtererArr.filter((i) => JSON.stringify(i.symbol).indexOf(filterSelected) !== -1);
      const sortedData = filterBySelectedValue.sort((a, b) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent));

      setCoinData(sortedData);
      setTempCoinData(filtererArr);
    }
  }, [coinList]);

  const onRefresh = () => {
    setIsRefresh(true);
    dispatch(appActions.getCoinList());
  }

  const handleSelectedFilter = (item) => {
    if (sortType !== 'percent') setSortType('percent');
    if (isIncrease) setIsIncrease(false);

    const value = item.data.length !== 0 ? item.data[0].value : item.value;
    const filterBySelectedValue = tempCoinData.filter((i) => JSON.stringify(i.symbol).indexOf(value) !== -1);
    const sortedData = filterBySelectedValue.sort((a, b) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent));

    setFilterSelected(item.value);
    setSubFilterData(item.data.length !== 0 ? item.data : []);
    setSubFilterSelected(item.data.length !== 0 ? item.data[0].value : '');
    setCoinData(sortedData);
  }

  const handleSubSelectedFilter = (item) => {
    setSubFilterSelected(item.value);
    setCoinData(tempCoinData.filter((i) => JSON.stringify(i.symbol).indexOf(item.value) !== -1));
  }

  const handleSort = (type) => {
    const sortValue = type === 'price' ? 'lastPrice' : 'priceChangePercent';
    setSortType(type);

    setIsIncrease(!isIncrease);
    if (isIncrease) {
      coinData.sort((a, b) => parseFloat(a[sortValue]) - parseFloat(b[sortValue]));
    } else {
      coinData.sort((a, b) => parseFloat(b[sortValue]) - parseFloat(a[sortValue]));
    }
  }

  const renderCoinItem = useCallback(({ item }) => <CoinListItem item={item} filterValue={subFilterData.length !== 0 ? subFilterSelected : filterSelected}/>, 
    [filterSelected, subFilterSelected]
  );

  const renderSubFilterItem = useCallback(({ item }) => <FilterItem item={item} isSubFilter selectedValue={subFilterSelected} onPress={() => handleSubSelectedFilter(item)}/>, 
    [subFilterSelected]
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const HeaderList = () => (
    <View style={[globalStyles.rowContainer, { justifyContent: 'space-between', marginBottom: 10 }]}>
      <View style={[globalStyles.rowContainer]}>
        <Text style={styles.headerTitle}>
          Name / <Text style={styles.headerTitle}>Vol</Text>
        </Text>
      </View>
      <View style={globalStyles.rowContainer}>
        <TouchableOpacity style={[globalStyles.rowContainer, { alignItems: 'center' }]} onPress={() => handleSort('price')}>
          <Text style={[styles.headerTitle, { textAlign: 'right' }]}>
            Last Price
          </Text>
          {sortType === 'price' && <SortIcon isIncrease={isIncrease}/>}
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.rowContainer, { width: 100, marginLeft: 10 }]} onPress={() => handleSort('percent')}>
          <Text style={[styles.headerTitle, { textAlign: 'right' }]}>
            24h Change
          </Text>
          {sortType === 'percent' && <SortIcon isIncrease={isIncrease}/>}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
        <View style={[globalStyles.rowContainer, { justifyContent: 'space-between', marginBottom: subFilterData.length !== 0 ? 10 : 20 }]}>
          {filterData.map((item, index) => (
            <FilterItem
              key={index}
              item={item}
              selectedValue={filterSelected}
              onPress={() => handleSelectedFilter(item)}
            />
          ))}
        </View>
        {subFilterData.length !== 0 && (
          <FlatList
            horizontal
            style={{ marginBottom: 20 }}
            contentContainerStyle={{ paddingRight: 25 }}
            data={subFilterData}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            renderItem={renderSubFilterItem}
          />
        )}
        <HeaderList />
      </View>
      {coinData.length !== 0 && (
        <FlatList
          style={styles.listWrapperContainer}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={coinData}
          refreshing={isRefresh}
          onRefresh={onRefresh}
          keyExtractor={keyExtractor}
          renderItem={renderCoinItem}
        />
      )}
    </View>
  );
};

export default HomeScreen;

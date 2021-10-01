const fetchList = async () => {
  const res = await fetch(
    `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
  );
  const { Data } = await res.json();
  return Data;
};

const transform = (data) => {
  return data.map(({ CoinInfo, DISPLAY }) => {
    const { PRICE, OPENDAY, CHANGEPCTDAY, CHANGEDAY } = DISPLAY.USD;

    return {
      name: CoinInfo.Name,
      current: PRICE,
      opening: OPENDAY,
      increase: `${CHANGEPCTDAY}% (${CHANGEDAY})`,
    };
  });
};

export const getList = async () => {
  const data = await fetchList();
  return transform(data);
};

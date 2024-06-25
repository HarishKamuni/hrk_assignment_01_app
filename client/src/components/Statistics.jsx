import Dropdown from './Dropdown';

const Statistics = ({ setSelectedMonth, data }) => {
  return (
    <div className="p-5 flex justify-center items-center flex-col border m-10 shadow-md bg-white py-8 rounded-md">
      <span className="flex items-center gap-5">
        <span className="text-xl font-bold">Statistics</span> -
        <Dropdown setSelectedMonth={setSelectedMonth} />
      </span>
      <section className="bg-yellow-200 p-5 rounded-lg w-[350px] flex flex-col gap-3 mt-5">
        <div className="flex items-center justify-between text-lg font-semibold capitalize ">
          {' '}
          <span>Total sale</span>
          <span>{data.totalSales}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold capitalize">
          {' '}
          <span>Total sold item</span>
          <span>{data.totalSoldItems}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold capitalize">
          {' '}
          <span>Total not sold item</span>
          <span>{data.totalNotSoldItems}</span>
        </div>
      </section>
    </div>
  );
};

export default Statistics;

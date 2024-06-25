import React, { useEffect, useState } from 'react';
import SummaryApi from '../../summaryApi/apiCollections';
import Statistics from '../../components/Statistics';
import Dropdown from '../../components/Dropdown';

const Transactions = () => {
  const [productData, setProductData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [page, setPage] = useState(1);
  const len = productData.length / 10;

  const fetchData = async () => {
    try {
      const res = await fetch(SummaryApi.getProductData.url, {
        method: SummaryApi.getProductData.method,
      });

      const { data } = await res.json();
      console.log(data);
      setProductData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setSearchData(e.target.value);
  };
  const handleNext = () => {
    if (len > page) {
      setPage(page + 1);
    } else {
      setPage(page);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(page);
    }
  };
  const fetchQueryData = async () => {
    try {
      const res = await fetch(
        `${SummaryApi.getPara.url}?title=${searchData}&description=${searchData}&price=${searchData}`,
        {
          method: SummaryApi.getPara.method,
        }
      );
      const { data } = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedMonth, setSelectedMonth] = useState('March');
  const [data, setData] = useState({
    totalSales: '',
    totalSoldItems: '',
    totalNotSoldItems: '',
  });
  console.log(data);

  const fetchMonthData = async () => {
    try {
      const res = await fetch(
        `${SummaryApi.getMonth.url}?month=${selectedMonth}`,
        {
          method: SummaryApi.getMonth.method,
        }
      );
      const data = await res.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchMonthData();
  }, []);
  useEffect(() => {
    fetchQueryData();
    fetchMonthData();
  }, [searchData, selectedMonth]);
  return (
    <div>
      {' '}
      <div className="p-5">
        <section className="flex justify-between items-center px-3">
          <span className="w-full">
            <input
              type="text"
              placeholder="search"
              value={searchData}
              onChange={handleChange}
              className="py-2 px-4  outline-1 outline-slate-300 border-2 rounded-md w-[40%]"
            />
          </span>

          <Dropdown />
        </section>
        <section className="mt-5">
          <table class="table border-2 w-full bg-white">
            <thead>
              <tr className=" bg-slate-400 text-center uppercase text-slate-900">
                <th className="border-2 py-2 ">ID</th>
                <th className="border-2">Title</th>
                <th className="border-2">Description</th>
                <th className="border-2">Price</th>
                <th className="border-2">Category</th>
                <th className="border-2">Sold</th>
                <th className="border-2">Image</th>
              </tr>
            </thead>
            <tbody>
              {productData
                .filter(
                  (item) =>
                    item.title
                      .toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    item.category
                      .toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    item.price.toString().includes(searchData.toLowerCase())
                )
                .slice(page * 10 - 10, page * 10)
                .map((item, i) => {
                  return (
                    <tr key={i} className="text-center">
                      <td className="border-2 p-2">{item.id}</td>
                      <td className="border-2 p-2 w-[20%]">{item.title}</td>
                      <td className="border-2 w-[55%] p-2 text-justify">
                        {item.description}
                      </td>
                      <td className="border-2 p-2">{item.price}</td>
                      <td className="border-2 p-2 w-[12%]">{item.category}</td>
                      <td className="border-2 p-2">
                        {item.sold ? 'true' : 'false'}
                      </td>
                      <td className="border-2 p-4 w-[20%] h-[20%]">
                        <img
                          src={item.image}
                          alt="image"
                          width={65}
                          className="block mx-auto w-[100%]"
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>

        <section className="bottom flex justify-between mt-4 ">
          {!searchData && <p>Page No : {page}</p>}

          <p>
            <button
              onClick={handlePrevious}
              className={`border py-1 px-4 mr-2 rounded-tl-full  rounded-bl-full uppercase ${
                page > 1
                  ? ' bg-slate-500 text-white hover:bg-slate-300 hover:text-black'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }  `}
            >
              Prev
            </button>
            -
            <button
              onClick={handleNext}
              className={`border py-1 px-4 ml-2 rounded-tr-full rounded-br-full uppercase ${
                len > page
                  ? ' bg-slate-500 text-white hover:bg-slate-300 hover:text-black '
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </p>
          {!searchData && <p> Per Page : 10</p>}
        </section>
      </div>
      <Statistics setSelectedMonth={setSelectedMonth} data={data} />
    </div>
  );
};

export default Transactions;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Edit2 } from "lucide-react";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
  // <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-4">
      <table className="min-w-full border-separate border-spacing-y-2">
        <caption className="text-sm text-gray-400 mb-4 text-white">
          A list of your recent registered companies
        </caption>
        <thead>
          <tr className="text-gray-300 text-sm rounded uppercase tracking-wide bg-gray-800">
            <th className="py-3 px-4 text-left bg-gray-400 text-black rounded-l-lg">Logo</th>
            <th className="py-3 px-4 text-left bg-gray-400 text-black">Name</th>
            <th className="py-3 px-4 text-left bg-gray-400 text-black">Date</th>
            <th className="py-3 px-4 text-right rounded-r-lg bg-gray-400 text-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterCompany?.map((company) => (
            <tr
              key={company._id}
              className="bg-white text-black hover:bg-gray-700 transition  border rounded"
            >
              <td className="py-3 px-4">
                <img
                  src={company.logo}
                  alt="Logo"
                  className="rounded-full w-10 h-10 object-cover border border-gray-800"
                />
              </td>
              <td className="py-3 px-4 text-black">{company.name}</td>
              <td className="py-3 px-4 text-black">
                {company.createdAt
                  ? company.createdAt.split("T")[0]
                  : "N/A"}
              </td>
              <td className="py-3 px-4 text-right relative">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === company._id ? null : company._id
                    )
                  }
                  className="p-2 rounded-lg hover:bg-gray-600 transition"
                >
                  <MoreHorizontal size={20} className="text-black" />
                </button>

                {openDropdown === company._id && (
                  <div className="absolute right-3 mt-2 w-32 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                    <button
                      className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-700 text-gray-300 transition"
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                    >
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   // </div>
  );
};

export default CompaniesTable;
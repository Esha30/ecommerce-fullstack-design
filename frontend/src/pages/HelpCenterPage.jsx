import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import Newsletter from "../components/Newsletter";
import HeaderForMobile from "../components/navbar/HeaderForMobile";

export default function HelpCenterPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHelp = async () => {
      try {
        const res = await axiosInstance.get("/support/help-center");
        setSections(res.data?.sections || []);
      } catch (error) {
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHelp();
  }, []);

  return (
    <div
      data-theme="winter"
      className="w-full min-h-screen bg-[#F7F8FA] flex flex-col items-center pb-0"
    >
      <HeaderForMobile />
      <div className="w-full max-w-[1000px] bg-white border border-[#DEE2E7] rounded-md p-6 my-8 px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-2">Help Center</h1>
        <p className="text-gray-600 mb-6">
          Find answers about orders, shipping, returns, and account support.
        </p>

        {loading && <p>Loading help articles...</p>}

        {!loading && sections.length === 0 && (
          <p className="text-gray-600">No help content available right now.</p>
        )}

        <div className="space-y-6 mt-6">
          {sections.map((section, sectionIdx) => (
            <div key={section.title} className="bg-[#F7F8FA] rounded-md p-4 border border-[#DEE2E7]">
              <h2 className="text-xl font-semibold mb-3 text-slate-800">{section.title}</h2>
              <div className="space-y-2">
                {(section.items || []).map((item, itemIdx) => (
                  <div key={itemIdx} className="collapse collapse-arrow bg-white border border-[#DEE2E7] rounded-md">
                    <input type="radio" name={`accordion-${sectionIdx}`} defaultChecked={itemIdx === 0} /> 
                    <div className="collapse-title text-base font-medium text-slate-700">
                      {item}
                    </div>
                    <div className="collapse-content text-slate-500 text-sm"> 
                      <p>Detailed information regarding "{item}" will be provided here. If you need further assistance with this topic, please use our Contact Us page to reach our support team directly.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-auto">
        <Newsletter />
      </div>
    </div>
  );
}

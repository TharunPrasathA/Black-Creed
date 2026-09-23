import Modal from "../common/Modal";
import { Ruler } from "lucide-react";

const defaultSizeChart = [
  {
    size: "S",
    chest: "36–38",
    waist: "30–32",
    hip: "36–38",
  },
  {
    size: "M",
    chest: "38–40",
    waist: "32–34",
    hip: "38–40",
  },
  {
    size: "L",
    chest: "40–42",
    waist: "34–36",
    hip: "40–42",
  },
  {
    size: "XL",
    chest: "42–44",
    waist: "36–38",
    hip: "42–44",
  },
  {
    size: "XXL",
    chest: "44–46",
    waist: "38–40",
    hip: "44–46",
  },
];

const SizeGuide = ({
  isOpen,
  onClose,
  sizeChart = defaultSizeChart,
  unit = "inches",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Size Guide"
      size="lg"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3 bg-[#F1F3EC] p-4">
          <Ruler className="mt-0.5 shrink-0 text-[#12372A]" size={20} />

          <p className="text-sm leading-6 text-[#68736A]">
            Use the chart below to find your best fit. Measurements are
            approximate and may vary slightly depending on the product style.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#12372A] text-left text-white">
                <th className="px-4 py-3 font-semibold">Size</th>
                <th className="px-4 py-3 font-semibold">
                  Chest ({unit})
                </th>
                <th className="px-4 py-3 font-semibold">
                  Waist ({unit})
                </th>
                <th className="px-4 py-3 font-semibold">
                  Hip ({unit})
                </th>
              </tr>
            </thead>

            <tbody>
              {sizeChart.map((row) => (
                <tr
                  key={row.size}
                  className="border-b border-[#DCE2D8] text-[#202923]"
                >
                  <td className="px-4 py-3 font-semibold">{row.size}</td>
                  <td className="px-4 py-3">{row.chest}</td>
                  <td className="px-4 py-3">{row.waist}</td>
                  <td className="px-4 py-3">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h4 className="font-semibold text-[#12372A]">
            How to measure
          </h4>

          <ul className="mt-3 space-y-2 text-sm leading-6 text-[#68736A]">
            <li>• Measure your chest around the fullest part.</li>
            <li>• Measure your waist around your natural waistline.</li>
            <li>• Measure your hips around the fullest part.</li>
            <li>• Keep the measuring tape comfortably loose.</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default SizeGuide;
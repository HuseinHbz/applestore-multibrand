'use client';
import { useState } from 'react';

export default function TradeInPage() {
  const [basePrice, setBasePrice] = useState(40000000); // قیمت پایه مدل انتخابی (تومان)
  const [batteryHealth, setBatteryHealth] = useState(85);
  const [bodyCondition, setBodyCondition] = useState('clean'); // clean, minor_scratch, damaged
  const [hasBox, setHasBox] = useState(true);
  const [isRepaired, setIsRepaired] = useState(false);
  const [finalPrice, setFinalPrice] = useState(null);

  const calculateUsedPrice = (e) => {
    e.preventDefault();
    let price = basePrice;

    // ۱. افت قیمت سلامت باتری (زیر ۸۰ درصد کسر بیشتر)
    if (batteryHealth < 80) {
      price *= 0.88;
    } else if (batteryHealth < 90) {
      price *= 0.94;
    }

    // ۲. وضعیت ظاهری
    if (bodyCondition === 'minor_scratch') {
      price *= 0.92;
    } else if (bodyCondition === 'damaged') {
      price *= 0.80;
    }

    // ۳. داشتن جعبه و مهلت تست
    if (!hasBox) {
      price -= 3000000;
    }

    // ۴. سابقه تعمیر یا تعویض قطعه
    if (isRepaired) {
      price *= 0.85;
    }

    setFinalPrice(Math.round(price / 100000) * 100000);
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-card text-card-foreground rounded-lg border shadow-sm dir-rtl">
      <h1 className="text-2xl font-bold mb-6 text-center">محاسبه‌گر هوشمند قیمت گوشی کارکرده</h1>
      
      <form onSubmit={calculateUsedPrice} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">ارزش حدودی مدل نو دستگاه (تومان):</label>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(Number(e.target.value))}
            className="w-full p-2 border rounded bg-background text-foreground"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">سلامت باتری (درصد): {batteryHealth}%</label>
          <input
            type="range"
            min="60"
            max="100"
            value={batteryHealth}
            onChange={(e) => setBatteryHealth(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">وضعیت ظاهر و بدنه:</label>
          <select
            value={bodyCondition}
            onChange={(e) => setBodyCondition(e.target.value)}
            className="w-full p-2 border rounded bg-background text-foreground"
          >
            <option value="clean">تمیز و بدون خط و خش</option>
            <option value="minor_scratch">خط و خش جزئی</option>
            <option value="damaged">ضربه‌خورده یا خط و خش عمیق</option>
          </select>
        </div>

        <div className="flex items-center gap-4 py-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasBox}
              onChange={(e) => setHasBox(e.target.checked)}
            />
            دارای جعبه و لوازم اصلی
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isRepaired}
              onChange={(e) => setIsRepaired(e.target.checked)}
            />
            سابقه بازشدگی یا تعویض قطعه
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground font-bold rounded hover:opacity-90"
        >
          محاسبه تخمین ارزش خرید
        </button>
      </form>

      {finalPrice !== null && (
        <div className="mt-6 p-4 bg-secondary text-secondary-foreground text-center rounded">
          <p className="text-lg">ارزش تخمینی خرید گوشی شما:</p>
          <p className="text-3xl font-extrabold text-primary mt-2">
            {finalPrice.toLocaleString()} تومان
          </p>
        </div>
      )}
    </div>
  );
}
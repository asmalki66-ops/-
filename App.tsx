
import React, { useState, useMemo } from 'react';
import { Period, ClassDetail } from './types';
import { DAYS_OF_WEEK, PERIODS, TEACHERS_DATA } from './constants';
import Dropdown from './components/Dropdown';
import ClassCard from './components/ClassCard';

const App: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | undefined>(undefined);

  const availableClasses = useMemo(() => {
    if (!selectedDay || !selectedPeriod) {
      return [];
    }

    const classes: ClassDetail[] = [];
    TEACHERS_DATA.forEach((teacher) => {
      const dailyTimetable = teacher.timetable.get(selectedDay);
      if (dailyTimetable) {
        const classDetail = dailyTimetable.get(selectedPeriod.id);
        if (classDetail) {
          classes.push(classDetail);
        }
      }
    });

    // Sort classes alphabetically by className
    return classes.sort((a, b) => a.className.localeCompare(b.className, 'ar'));
  }, [selectedDay, selectedPeriod]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      {/* School Logo removed */}
      {/* <img src="/school_logo.png" alt="School Logo" className="school-logo" /> */}

      <h1 className="text-5xl font-extrabold text-black mb-2 mt-4 text-center">
        مُشاهد جدول الحصص
      </h1>
      {/* School Vision */}
      <p className="text-2xl font-semibold text-blue-800 text-center mb-8 font-kufi">
        (الثناء مؤسسة تربوية تعليمية ذات جودة عالية تحصليا وتقنيا)
      </p>

      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Dropdown
          label="اختر اليوم"
          options={DAYS_OF_WEEK}
          value={selectedDay}
          onChange={setSelectedDay}
          getOptionLabel={(day) => day}
          getOptionValue={(day) => day}
          placeholder="اختر اليوم"
        />
        <Dropdown
          label="اختر الحصة"
          options={PERIODS}
          value={selectedPeriod}
          onChange={setSelectedPeriod}
          getOptionLabel={(period) => `الحصة ${period.id} (${period.time})`}
          getOptionValue={(period) => period.id}
          placeholder="اختر الحصة"
        />
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-black mb-6 text-center">
          الحصص المتاحة
        </h2>
        {selectedDay && selectedPeriod ? (
          availableClasses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableClasses.map((classDetail, index) => (
                <ClassCard key={index} classDetail={classDetail} />
              ))}
            </div>
          ) : (
            <p className="text-2xl text-black text-center py-8">
              لا توجد حصص لهذا اليوم والفترة المحددين.
            </p>
          )
        ) : (
          <p className="text-2xl text-black text-center py-8">
            يرجى تحديد اليوم والحصة لعرض الجداول.
          </p>
        )}
      </div>

      <footer className="mt-12 text-black text-base">
        <p>&copy; {new Date().getFullYear()} Timetable Viewer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

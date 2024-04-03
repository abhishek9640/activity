"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useActiveSectionContext } from "@/context/active-section-context";
import { links } from "@/lib/data";

type Activity = {
  activity: string;
  type: string;
  participants: number;
};

const Recreational = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const responses = await Promise.all([
          axios.get('https://www.boredapi.com/api/activity?type=recreational&participants=1'),
          axios.get('https://www.boredapi.com/api/activity?type=recreational&participants=1'),
          axios.get('https://www.boredapi.com/api/activity?type=recreational&participants=1')
        ]);
        const fetchedActivities = responses.map(response => response.data) as Activity[];
        setActivities(fetchedActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);
  const { activeSection } = useActiveSectionContext();
  if (activeSection !== links[2].name) {
    return null
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recreational Activities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] transition sm:group-even:pl-8 ${index % 2 === 0 ? 'bg-[#7fa160]' : 'bg-[#55396a]'}`}
          >
            <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
              <h3 className="text-2xl font-semibold">{activity.activity}</h3>
              <p className="mt-2 leading-relaxed text-gray-900 dark:text-white/70">Type: {activity.type}</p>
              <p className="mt-2 leading-relaxed text-gray-900 dark:text-white/70">Participants: {activity.participants}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Recreational;

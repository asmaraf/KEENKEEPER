import { useState, useEffect } from 'react';
import { Friend, TimelineEntry } from '../types';

const TIMELINE_KEY = 'keenkeeper_timeline';

export function useAppState() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial data fetch
    const fetchFriends = async () => {
      try {
        // In a real app, this would be an API call
        const response = await fetch('/friends.json');
        const data = await response.json();
        setFriends(data);
        
        // Load timeline from local storage
        const savedTimeline = localStorage.getItem(TIMELINE_KEY);
        if (savedTimeline) {
          setTimeline(JSON.parse(savedTimeline));
        } else {
          // Add some initial mock timeline entries if empty
          const initialTimeline: TimelineEntry[] = [
            { id: 't1', friendId: 5, friendName: "Sarah Chen", date: "2026-04-14", type: "Call" },
            { id: 't2', friendId: 6, friendName: "Marcus Johnson", date: "2026-04-12", type: "Text" },
            { id: 't3', friendId: 8, friendName: "Ryan O'Brien", date: "2026-04-07", type: "Video" },
          ];
          setTimeline(initialTimeline);
          localStorage.setItem(TIMELINE_KEY, JSON.stringify(initialTimeline));
        }
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setTimeout(() => setLoading(false), 800); // Simulate network delay for loading animation requirement
      }
    };

    fetchFriends();
  }, []);

  const addInteraction = (friend: Friend, type: TimelineEntry['type']) => {
    const newEntry: TimelineEntry = {
      id: Date.now().toString(),
      friendId: friend.id,
      friendName: friend.name,
      date: new Date().toISOString().split('T')[0],
      type,
    };
    
    const updatedTimeline = [newEntry, ...timeline];
    setTimeline(updatedTimeline);
    localStorage.setItem(TIMELINE_KEY, JSON.stringify(updatedTimeline));
    return newEntry;
  };

  return { friends, timeline, loading, addInteraction };
}

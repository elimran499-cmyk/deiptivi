import { Channel } from '../types';

/**
 * Utility to parse M3U / M3U8 playlist strings into Channel objects
 */
export function parseM3UPlaylist(m3uContent: string): Channel[] {
  const lines = m3uContent.split(/\r?\n/);
  const channels: Channel[] = [];

  let currentChannel: Partial<Channel> | null = null;
  let channelIndex = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('#EXTINF:')) {
      currentChannel = {};
      
      // Parse tvg-logo
      const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
      const logo = logoMatch ? logoMatch[1] : '';

      // Parse group-title (category)
      const groupMatch = line.match(/group-title="([^"]+)"/i);
      const groupTitle = groupMatch ? groupMatch[1] : 'General';

      // Parse tvg-country / country
      const countryMatch = line.match(/tvg-country="([^"]+)"/i);
      const country = countryMatch ? countryMatch[1].toUpperCase() : 'US';

      // Channel name (after last comma)
      const commaIndex = line.lastIndexOf(',');
      let channelName = commaIndex !== -1 ? line.substring(commaIndex + 1).trim() : 'Channel ' + channelIndex;
      
      // Clean up common channel name tags
      channelName = channelName.replace(/^#EXTINF:.*?,/, '').trim();

      // Quality detection from name
      let quality: '4K' | 'FHD' | 'HD' | 'SD' = 'HD';
      if (/4K|UHD|2160/i.test(channelName)) quality = '4K';
      else if (/FHD|1080/i.test(channelName)) quality = 'FHD';
      else if (/HD|720/i.test(channelName)) quality = 'HD';
      else if (/SD/i.test(channelName)) quality = 'SD';

      currentChannel = {
        id: `custom-m3u-${Date.now()}-${channelIndex}`,
        name: channelName,
        number: 500 + channelIndex,
        category: groupTitle,
        country: country,
        logo: logo || 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=150&auto=format&fit=crop&q=80',
        quality: quality,
        isSubscribed: true,
        isFavorite: false,
        viewersCount: Math.floor(Math.random() * 8000) + 1200,
        groupTitle: groupTitle,
        currentProgram: {
          id: `epg-${channelIndex}-1`,
          title: `${channelName} Live Transmission`,
          description: 'Live broadcast stream from imported custom IPTV playlist source.',
          startTime: '14:00',
          endTime: '16:00',
          durationMinutes: 120,
          progressPercent: 45,
          category: groupTitle
        },
        upcomingPrograms: [
          {
            id: `epg-${channelIndex}-2`,
            title: `${channelName} Evening Highlights`,
            description: 'Curated prime-time lineup and special event stream.',
            startTime: '16:00',
            endTime: '18:00',
            durationMinutes: 120,
            progressPercent: 0,
            category: groupTitle
          }
        ]
      };
    } else if (line.length > 0 && !line.startsWith('#') && currentChannel) {
      // This line is the stream URL
      currentChannel.streamUrl = line;
      channels.push(currentChannel as Channel);
      currentChannel = null;
      channelIndex++;
    }
  }

  return channels;
}

import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const useLocalIpAddress = () => {
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const getIpAddress = async () => {
      let localIp = '';
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        const { ipAddress } = await NetInfo.fetch();
        localIp = ipAddress;
      }
      // Si l'adresse IP locale n'est pas disponible, utiliser une adresse IP de secours
      if (!localIp) {
        localIp = '192.168.1.1'; // Remplacez par l'adresse IP de secours de votre choix
      }
      setIpAddress(localIp);
    };

    getIpAddress();
  }, []);

  return ipAddress;
};

export default useLocalIpAddress;

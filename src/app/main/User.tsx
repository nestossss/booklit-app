import React, { useMemo } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Ionicons } from '@expo/vector-icons';
import { Library } from '../../util/types'
import { useLib } from '../../hooks/useLib';
import { useSession } from '../../hooks/useSession';

const Estatisticas = ({ lib }: { lib: Library }) => {
  const genres = useMemo(() => {
    const genreCounts: { [key: string]: number } = {};
    const allBooks = [...(lib.salvos || []), ...(lib.terminados || []), ...(lib.sendoLidos || [])];
    
    allBooks.forEach(record => {
      record.livro.generos?.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    return Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  }, [lib]);

  const totalReadingTime = useMemo(() => {
    return [...(lib.salvos || []), ...(lib.terminados || []), ...(lib.sendoLidos || [])]
      .reduce((total, record) => total + record.tempoLido, 0);
  }, [lib]);

  const totalReadingDays = useMemo(() => {
    const uniqueDays = new Set();
    [...(lib.salvos || []), ...(lib.terminados || []), ...(lib.sendoLidos || [])].forEach(record => {
      const date = new Date(record.tempoLido).toDateString();
      uniqueDays.add(date);
    });
    return uniqueDays.size;
  }, [lib]);

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gêneros</Text>
        <Text style={styles.sectionSubtitle}>Seu gênero mais lido é {genres[0]?.name}, já aparecem em {genres[0]?.count} dos seus livros</Text>
        {genres.map((genre, index) => (
          <View key={index} style={styles.genreItem}>
            <View style={styles.genreHeader}>
              <Text className='w-1/2 ' style={styles.genreName}>{genre.name}</Text>
              <Text className="w-1/2 text-right" style={styles.genreCount}>{genre.count} livros</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(genre.count / genres[0].count) * 100}%` }]} />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tempo de leitura</Text>
        <Text style={styles.statNumber}>{Math.floor(totalReadingTime / 3600000)}</Text>
        <Text style={styles.statLabel}>Horas totais lidas</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dias de leitura</Text>
        <Text style={styles.statNumber}>{totalReadingDays}</Text>
        <Text style={styles.statLabel}>Dias totais lidos</Text>
      </View>
    </ScrollView>
  );
};

export default function User() {
  const [lib] = useLib();
  const [session] = useSession();
  const username = session.username;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'biblioteca', title: 'Biblioteca' },
    { key: 'progresso', title: 'Progresso' },
  ]);

  const totalStarted = (lib.salvos?.length || 0) + (lib.sendoLidos?.length || 0);
  const totalFinished = lib.terminados?.length || 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/default-user-image.jpg')} style={styles.avatar} />
        <Text className='w-full text-center' style={styles.username}>{username}</Text>
        <Text className='w-full text-center' style={styles.userStats}>{totalStarted} Livros iniciados • {totalFinished} finalizados</Text>
      </View>
      <Estatisticas lib={lib}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    backgroundColor: '#47A538',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  userStats: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  tabBar: {
    backgroundColor: '#111111',
  },
  tabIndicator: {
    backgroundColor: '#47A538',
  },
  tabLabel: {
    color: 'white',
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#939393',
    marginBottom: 15,
  },
  genreItem: {
    marginBottom: 15,
  },
  genreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  genreName: {
    fontSize: 14,
    color: 'white',
  },
  genreCount: {
    fontSize: 14,
    color: '#939393',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#47A538',
    borderRadius: 4,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: '#939393',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
});
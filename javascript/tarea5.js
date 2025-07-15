function getFastestRunners(runners) {
    //Calcular el tiempo total de cada corredor en segundos
    const runnersWithTotalTime = runners.map(runner => {
        const totalSeconds = runner.paces.reduce((total, pace) => {
            const [minutes, seconds] = pace.split(':').map(Number);
            return total + minutes * 60 + seconds;
        }, 0);
        
        return {
            ...runner,
            totalTime: totalSeconds
        };
    });
    
    //Calcular el tiempo promedio de todos los corredores
    const totalTimeAllRunners = runnersWithTotalTime.reduce((sum, runner) => sum + runner.totalTime, 0);
    const averageTime = totalTimeAllRunners / runners.length;
    
    //Filtrar corredores más rápidos que el promedio
    const fasterRunners = runnersWithTotalTime.filter(runner => runner.totalTime < averageTime);
    
    //Ordenar por tiempo total (de menor a mayor)
    fasterRunners.sort((a, b) => a.totalTime - b.totalTime);
    
    //Formatear el resultado como se solicita
    const result = fasterRunners.map(runner => {
        //Calcular ritmo promedio (totalTime / 7 km) y convertirlo a mm:ss
        const averageSeconds = Math.round(runner.totalTime / 7);
        const avgMinutes = Math.floor(averageSeconds / 60);
        const avgSeconds = averageSeconds % 60;
        const averagePace = `${avgMinutes}:${avgSeconds.toString().padStart(2, '0')}`;
        
        //Encontrar el ritmo más rápido (el menor tiempo)
        const fastestPace = runner.paces.reduce((fastest, pace) => {
            return pace < fastest ? pace : fastest;
        }, runner.paces[0]);
        
        return {
            name: runner.name,
            averagePace,
            fastestPace
        };
    });
    
    return result;
}

const runners = [
    {
        "name": "Alice",
        "paces": ["5:50", "6:00", "6:06", "6:07", "6:08", "6:19", "6:28"]
    },
    {
        "name": "Diana",
        "paces": ["6:00", "6:05", "6:10", "6:15", "6:20", "6:25", "6:30"]
    }
    ,
    {
        "name": "Eve",
        "paces": ["5:40", "5:50", "6:00", "6:10", "6:20", "6:30", "6:40"]
    }
    ,
    {
        "name": "Frank",
        "paces": ["6:05", "6:10", "6:15", "6:20", "6:25", "6:30", "6:35"]
    }
    
];

console.log(getFastestRunners(runners));
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { defaultTheme } from "../../configs/default-theme"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SetStateAction, useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';


type ParamsTimer = {
  timer : {minutes : number, seconds : number}
  setTimer : React.Dispatch<SetStateAction<{minutes : number, seconds : number}>>
};

export function Timer({ timer, setTimer } : ParamsTimer) {
    const [timerStatus, setTimerStatus] = useState(true);
    useEffect(() => {
        const tick = () => {
            if (!timerStatus) return;
            setTimer(prevTime => {
                const newSeconds = prevTime.seconds + 1;
                if (newSeconds === 60) {
                    return { minutes: prevTime.minutes + 1, seconds: 0 };
                }
                return { minutes: prevTime.minutes, seconds: newSeconds };
            });
        };
        const intervalId = setInterval(tick, 1000);
        return () => clearInterval(intervalId);
    }, [timerStatus]);

    return (
        <View style={styles.container}>
            <Text style={styles.timerText} >
                {String(timer.minutes).padStart(2, "0")}:{String(timer.seconds).padStart(2, "0")}
            </Text>
            <TouchableOpacity onPress={() => setTimerStatus(prev => !prev)}>
                {
                    timerStatus
                        ?
                        <FontAwesome5
                            name="pause-circle"
                            size={32}
                            color={defaultTheme.colors.primaryText}
                        />
                        :
                        <AntDesign
                            name="playcircleo"
                            size={32}
                            color={defaultTheme.colors.primaryText}
                        />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    timerText: {
        fontSize: 40,
        fontWeight: "bold",
        color: defaultTheme.colors.primaryText
    }
})
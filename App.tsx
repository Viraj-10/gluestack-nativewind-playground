import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, Pressable } from "react-native";

import { GluestackUIProvider } from "@/components/ui/core/ThemeProvider";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetBackdrop,
  ActionsheetDragIndicator,
} from "@/components/ui/actionsheet/gothom";
import { cssInterop } from "nativewind";

import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
cssInterop(Pressable, { className: "style" });
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <View
        className="flex-1 justify-center items-center mt-96"
        style={{
          marginTop: 96,
        }}
      >
        <Pressable className="bg-red-500">
          <Text>Hello</Text>
        </Pressable>
      </View>
      {/* <Actionsheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onOpen={() => {
            setIsOpen(true);
          }}
        >
          <ActionsheetBackdrop />
          <ActionsheetDragIndicator
            style={{
              backgroupColor: "red",
            }}
          />
          <ActionsheetContent className="bg-slate-100"></ActionsheetContent>
        </Actionsheet> */}
    </>
  );
}

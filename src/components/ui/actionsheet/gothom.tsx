import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheet,
  BottomSheetHandle,
} from "@gorhom/bottom-sheet";
import { useControllableState } from "@gluestack-ui/hooks";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ActionsheetContext = createContext<any>({});
export const Actionsheet = ({
  isOpen,
  onClose,
  onOpen,
  defaultIsOpen = false,
  snapToIndex = 0,
  ...props
}: any) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const backDropRef = useRef<any>(false);
  const handlerRef = useRef<BottomSheet>(null);

  const [visible, setVisible] = useControllableState({
    value: isOpen,
    defaultValue: defaultIsOpen,
    onChange: (val) => {
      if (val === false) {
        onClose && onClose();
      } else {
        onOpen && onOpen();
      }
    },
  });
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(snapToIndex);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  console.log(handlerRef.current, "handlerRef.current");

  return (
    <ActionsheetContext.Provider
      value={{
        handleClose,
        backDropRef,
        handlerRef,
      }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        backdropComponent={backDropRef.current ? BackDropComponent : null}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        // @ts-ignore
        handleComponent={handlerRef.current ? handlerRef.current : null}
      >
        {props.children}
      </BottomSheet>
    </ActionsheetContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export const ActionsheetContent = ({ ...props }) => {
  console.log("🚀 ~ ActionsheetContent ~ props:", props);
  const { handleClose } = useContext(ActionsheetContext);
  return (
    <BottomSheetView {...props}>
      <Text>Awesome 🎉</Text>
      <Pressable onPress={handleClose}>
        <Text>Close</Text>
      </Pressable>
    </BottomSheetView>
  );
};

const BackDropComponent = ({
  disappearsOnIndex = -1,
  appearsOnIndex = 0,
  ...props
}: any) => {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={disappearsOnIndex}
      appearsOnIndex={appearsOnIndex}
    />
  );
};

const HandleComponent = (props: any) => {
  return (
    <BottomSheetHandle {...props}>
      <View
        style={{
          width: "100%",
          height: 40,
          backgroundColor: "grey",
          borderRadius: 2,
        }}
      />
    </BottomSheetHandle>
  );
};

export const ActionsheetBackdrop = () => {
  const { backDropRef } = useContext(ActionsheetContext);
  useEffect(() => {
    backDropRef.current = true;
    return () => {
      backDropRef.current = false;
    };
  }, []);

  return null;
};

type IActionsheetDragIndicator = React.ComponentProps<typeof BottomSheetHandle>;
export const ActionsheetDragIndicator = ({
  ...indicatorProps
}: IActionsheetDragIndicator) => {
  const { handlerRef } = useContext(ActionsheetContext);
  const HandleComponent = (props: any) => {
    return (
      <BottomSheetHandle {...indicatorProps} {...props}></BottomSheetHandle>
    );
  };
  useEffect(() => {
    handlerRef.current = HandleComponent;
    return () => {
      handlerRef.current = false;
    };
  }, []);

  return null;
};

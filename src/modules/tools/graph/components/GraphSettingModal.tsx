import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { GraphRangeSetting } from "./GraphRangeSetting";

export function GraphSettingModal({
  isOpen,
  onClose,
}: Omit<ModalProps, "children">) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent alignItems="center" minW="800px">
        <ModalHeader flexDirection="row" display="flex" width="100%">
          <Text>Graph Settings</Text>
        </ModalHeader>
        <Divider orientation="horizontal" />
        <ModalBody width="100%">
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Range</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <GraphRangeSetting />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

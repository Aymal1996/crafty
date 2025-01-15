import GeneralSetting from "@/components/backoffice/GeneralSetting"
import ChangePassword from "@/components/backoffice/ChangePassword"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Account() {
  return (
    <Tabs defaultValue="general-setting" className=" py-20">
      <TabsList className="w-1/2 grid grid-cols-2 dark:bg-gray-800">
        <TabsTrigger value="general-setting" className="data-[state=active]:text-white data-[state=active]:bg-green-700">General Setting</TabsTrigger>
        <TabsTrigger value="chnage-password" className="data-[state=active]:text-white data-[state=active]:bg-green-700">Change Password</TabsTrigger>
      </TabsList>
      <TabsContent value="general-setting">
        <GeneralSetting />
      </TabsContent>
      <TabsContent value="chnage-password">
        <ChangePassword/>
      </TabsContent>
    </Tabs>
  )
}

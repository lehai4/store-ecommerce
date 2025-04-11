import { BarsOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { RootState } from "@/store/store";
const HeaderAdmin = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const { user } = useAppSelector((state: RootState) => state.authen);
  return (
    <div className="h-16">
      <div className="border-b-[0.5px] border-gray-300 p-2 h-full">
        <div className="flex items-center justify-between h-full">
          <BarsOutlined onClick={onToggleSidebar} className="text-2xl" />
          <div className="flex items-center gap-2">
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <Avatar
                src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                size="large"
              />
              <div className="text-lg font-medium">{user?.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;

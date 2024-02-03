import { FC } from 'react'
import SidebarWithHeader from '@/components/navigation/secondaryNav';
import MainNav from '@/components/navigation/mainNav';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({children}) => {
  return (
  <MainNav>
  <SidebarWithHeader>
    {children}
  </SidebarWithHeader>
  </MainNav>
  );
}

export default layout
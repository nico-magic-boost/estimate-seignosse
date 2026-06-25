import { AdminLogo } from '@/components/admin/Logo'
import { AdminIcon } from '@/components/admin/Icon'
import { BeforeDashboard } from '@/components/admin/Dashboard'
import { BeforeLogin } from '@/components/admin/BeforeLogin'
import { GenerateWithAI } from '@/components/admin/GenerateWithAI'
import { GeneratePillarPage } from '@/components/admin/GeneratePillarPage'
import { PillarPagePreview } from '@/components/admin/PillarPagePreview'

export const importMap = {
  '@/components/admin/Logo#AdminLogo': AdminLogo,
  '@/components/admin/Icon#AdminIcon': AdminIcon,
  '@/components/admin/Dashboard#BeforeDashboard': BeforeDashboard,
  '@/components/admin/BeforeLogin#BeforeLogin': BeforeLogin,
  '@/components/admin/GenerateWithAI#GenerateWithAI': GenerateWithAI,
  '@/components/admin/GeneratePillarPage#GeneratePillarPage': GeneratePillarPage,
  '@/components/admin/PillarPagePreview#PillarPagePreview': PillarPagePreview,
}

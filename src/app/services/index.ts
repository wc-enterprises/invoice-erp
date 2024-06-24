import { ContactsMockApi } from 'app/services/apps/contacts/api';
import { ECommerceInventoryMockApi } from 'app/services/apps/ecommerce/inventory/api';
import { AuthMockApi } from 'app/services/common/auth/api';
import { MessagesMockApi } from 'app/services/common/messages/api';
import { NavigationMockApi } from 'app/services/common/navigation/api';
import { NotificationsMockApi } from 'app/services/common/notifications/api';
import { SearchMockApi } from 'app/services/common/search/api';
import { ShortcutsMockApi } from 'app/services/common/shortcuts/api';
import { UserMockApi } from 'app/services/common/user/api';
import { AnalyticsMockApi } from 'app/services/dashboards/analytics/api';
import { FinanceMockApi } from 'app/services/dashboards/finance/api';
import { ProjectMockApi } from 'app/services/dashboards/project/api';

export const mockApiServices = [
    AnalyticsMockApi,
    AuthMockApi,
    ContactsMockApi,
    ECommerceInventoryMockApi,
    FinanceMockApi,
    MessagesMockApi,
    NavigationMockApi,
    NotificationsMockApi,
    ProjectMockApi,
    SearchMockApi,
    ShortcutsMockApi,
    UserMockApi,
];

export const Configuration = {
    profile: 'dev',
    baseUrl: process.env.REACT_APP_BASE_URL,
    resourceVersion: `expense/api/${process.env.REACT_APP_RESOURCE_VERSION}/`,
    group: 'group/',
    version: process.env.REACT_APP_VERSION,
    github: 'https://github.com/codesnaper/expense',
    wsUrl: `${process.env.REACT_APP_WS_BASE_URL}`,
    debug: process.env.REACT_APP_LOG_DEBUG ? new Boolean(process.env.REACT_APP_LOG_DEBUG).valueOf(): false,
    connectionTimeout: Number(process.env.REACT_APP_CONNECTION_TIMEOUT)
}

export const NavigationLink = [
    { name: 'Add Expense', link: '/bank' },
    { name: 'Set Limit', link: '/limit' },
    { name: 'Categories', link: '/category' },
    { name: 'Banks', link: '/bank' },
    { name: 'Goal', link: '/goal' }
];
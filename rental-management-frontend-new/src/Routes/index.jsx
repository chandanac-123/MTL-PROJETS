import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './Routes'
import { v4 } from 'uuid'
import MasterLayout from '../Layout/MasterLayout'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import { AuthLayout } from '../Pages/Authentication/AuthLayout'
import PageNotFound from '../Layout/PageNotFound'

const Index = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route element={<MasterLayout />}>
                <Route path="*" element={<PageNotFound />} />
                    {routes.map((item) => {
                        if (item?.permission && item.privetRoute) {
                            if (item?.subMenu) {
                               return item?.subMenu?.map(sub => {
                                    return (
                                        <Route
                                            key={v4()}
                                            path={'/' + sub.path}
                                            element={<sub.component />}
                                        />
                                    )
                                })

                            } else {
                                return (
                                    <Route
                                        key={v4()}
                                        path={'/' + item.path}
                                        element={<item.component />}
                                    />
                                )
                            }

                        }
                    })
                    }
                </Route>
            </Route>
            <Route element={<PublicRoute />}>
                <Route element={<AuthLayout />}>
                    {routes.map((item) => {
                        if (!item.privetRoute) {
                            return (
                                <Route
                                    key={v4()}
                                    path={'/' + item.path}
                                    element={<item.component />}
                                />
                            )
                        }

                    })
                    }
                </Route>
            </Route>
        </Routes>
    )
}

export default Index
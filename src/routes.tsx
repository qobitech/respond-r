import React from "react"
import { Routes, Route } from "react-router-dom"
import { routes } from "utils/route"
import AuthRoute from "utils/route/auth"
import PublicRoute from "utils/route/public"
import { url } from "enums/Route"
import Page404 from "utils/404"

const RouteList = () => {
  return (
    <>
      <Routes>
        {routes!?.map((item) => {
          const { paths, PageRenders } = item

          return (
            <Route path={paths[0]} key={item.id}>
              {PageRenders.map((PageRender, index) =>
                PageRender ? (
                  <Route
                    path={paths[index]}
                    index={index === 0}
                    element={
                      item.routeType !== "public" ? (
                        <AuthRoute element={PageRender} />
                      ) : (
                        <PublicRoute element={PageRender} />
                      )
                    }
                    key={item.id}
                  />
                ) : null
              )}
            </Route>
          )
        })}
        <Route path={url.PAGE404} Component={Page404} />
      </Routes>
    </>
  )
}

export default RouteList

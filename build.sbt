lazy val main = project
  .in(file("code"))
  .settings(
    scalaVersion := "3.6.3",
    libraryDependencies += "org.creativescala" %% "doodle" % "0.27.0"
  )

lazy val docs = project
  .in(file("focsipedia-docs"))
  .dependsOn(main)
  .enablePlugins(MdocPlugin, DocusaurusPlugin)
  .settings(
    scalaVersion := "3.6.3",
    moduleName := "focsipedia-docs",
    
  )

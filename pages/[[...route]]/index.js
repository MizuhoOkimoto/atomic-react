import React from "react";
import {serialize} from "next-mdx-remote/serialize";
import {MDXRemote} from "next-mdx-remote";
import Link from "next/link";
import Head from "next/head";
import matter from "gray-matter";
import {MDXProvider} from "@mdx-js/react";

import AApp from "../../framework/components/AApp";
import {ACol, AContainer, ARow} from "../../framework/components/ALayout";
import HiddenFontSwatches from "../../docs/HiddenFontSwatches";
import Sidebar from "../../docs/Sidebar";
import PropsContext from "../../docs/PropsContext";
import MdxHeadings from "../../docs/MdxHeadings";
import {ColorSwatch, Playground, Props} from "../../docs";

export default function TestPage({source, frontMatter}) {
  const {edges: menus} = data.allMdx;
  const propsContextValue = data.allComponentMetadata.nodes;

  return (
    <>
      <Head>
        <title>{`${frontMatter.name} | atomic-react`}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <AApp persistTheme style={{minHeight: "100vh"}}>
        <HiddenFontSwatches />
        <AContainer fluid className="pa-0">
          <ARow noGutters>
            <ACol style={{maxWidth: 330}}>
              <Sidebar currentDoc={frontMatter} menus={menus} />
            </ACol>
            <ACol className="pa-8" style={{maxWidth: "calc(100vw - 347px)"}}>
              <PropsContext.Provider value={propsContextValue}>
                <MDXProvider
                  components={{
                    ColorSwatch,
                    Playground,
                    Props,
                    Link,
                    ...MdxHeadings
                  }}>
                  <MDXRemote {...source} />
                </MDXProvider>
              </PropsContext.Provider>
            </ACol>
          </ARow>
        </AContainer>
      </AApp>
    </>
  );
}

export async function getStaticPaths() {
  const paths = [];
  const fs = require("fs");
  const files = require("glob").sync("./framework/**/*.mdx");
  files.forEach((x) => {
    const file = fs.readFileSync(x, {encoding: "utf8", flag: "r"});
    const {data} = matter(file);
    if (data.route === "/") {
      paths.push({
        params: {route: false}
      });
      return;
    }

    paths.push(data.route);
  });

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({params}) {
  const route = params.route?.join("/") || "";
  const fs = require("fs");
  const files = require("glob").sync("./framework/**/*.mdx");
  let target;
  for (let i = 0; i < files.length; i++) {
    const file = fs.readFileSync(files[i], {encoding: "utf8", flag: "r"});
    const {content, data} = matter(file);
    if (data.route === `/${route}`) {
      target = {content, data};
      break;
    }
  }

  const mdxSource = await serialize(target.content, {scope: target.data});
  return {
    props: {
      source: mdxSource,
      frontMatter: target.data
    }
  };
}

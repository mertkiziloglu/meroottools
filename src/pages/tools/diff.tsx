import React from "react";
import { NextSeo } from "next-seo";
import { SEO } from "../../constants/seo";
import Layout from "../../layout/PageLayout";
import { DiffTool } from "../../features/diff/DiffTool";

const DiffPage = () => {
  return (
    <Layout>
      <NextSeo
        {...SEO}
        title="File Diff Tool | Tools"
        canonical="https://jsoncrack.com/tools/diff"
        description="Compare text and JSON files. Visualize and analyze differences between two different files."
      />
      <DiffTool />
    </Layout>
  );
};

export default DiffPage;

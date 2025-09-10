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
        title="Dosya Karşılaştırma Aracı | Meroot Tools"
        canonical="https://jsoncrack.com/tools/diff"
        description="Metin ve JSON dosyalarını karşılaştırın. İki farklı dosya arasındaki farkları görselleştirin ve analiz edin."
      />
      <DiffTool />
    </Layout>
  );
};

export default DiffPage;

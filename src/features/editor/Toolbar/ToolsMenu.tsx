import React from "react";
import { Menu, Flex } from "@mantine/core";
import { JSONSchemaFaker } from "json-schema-faker";
// import { event as gaEvent } from "nextjs-google-analytics"; // Devre dışı bırakıldı
import toast from "react-hot-toast";
import { CgChevronDown } from "react-icons/cg";
import { FaRandom } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";
import { SiJsonwebtokens } from "react-icons/si";
import { VscSearchFuzzy, VscJson, VscGroupByRefType } from "react-icons/vsc";
import { jsonToContent } from "../../../lib/utils/jsonAdapter";
import useFile from "../../../store/useFile";
import useJson from "../../../store/useJson";
import { useModal } from "../../../store/useModal";
import { StyledToolElement } from "./styles";

export const ToolsMenu = () => {
  const setVisible = useModal(state => state.setVisible);
  const getJson = useJson(state => state.getJson);
  const setContents = useFile(state => state.setContents);
  const getFormat = useFile(state => state.getFormat);

  const randomizeData = async () => {
    try {
      // generate json schema
      const { run } = await import("json_typegen_wasm");
      const jsonSchema = run(
        "Root",
        getJson(),
        JSON.stringify({
          output_mode: "json_schema",
        })
      );

      // generate random data
      const randomJson = JSONSchemaFaker.generate(JSON.parse(jsonSchema));
      const contents = await jsonToContent(JSON.stringify(randomJson, null, 2), getFormat());
      setContents({ contents });

      // gaEvent("randomize_data"); // Devre dışı bırakıldı
    } catch (error) {
      // console.error(error); // Production'da devre dışı
      toast.error("Failed to generate mock data");
    }
  };

  return (
    <Menu shadow="md" withArrow>
      <Menu.Target>
        <StyledToolElement onClick={() => {/* gaEvent("show_tools_menu"); */}}>
          <Flex align="center" gap={3}>
            Tools <CgChevronDown />
          </Flex>
        </StyledToolElement>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          fz={12}
          leftSection={<VscSearchFuzzy />}
          onClick={() => {
            setVisible("JQModal", true);
            // gaEvent("open_jq_modal"); // Devre dışı bırakıldı
          }}
        >
          JSON Query (jq)
        </Menu.Item>
        <Menu.Item
          fz={12}
          leftSection={<VscJson />}
          onClick={() => {
            setVisible("SchemaModal", true);
            // gaEvent("open_schema_modal"); // Devre dışı bırakıldı
          }}
        >
          JSON Schema
        </Menu.Item>
        <Menu.Item
          fz={12}
          leftSection={<MdFilterListAlt />}
          onClick={() => {
            setVisible("JPathModal", true);
            // gaEvent("open_json_path_modal"); // Devre dışı bırakıldı
          }}
        >
          JSON Path
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          fz={12}
          leftSection={<SiJsonwebtokens />}
          onClick={() => {
            setVisible("JWTModal", true);
            // gaEvent("open_jwt_modal"); // Devre dışı bırakıldı
          }}
        >
          Decode JWT
        </Menu.Item>
        <Menu.Item
          fz={12}
          leftSection={<VscGroupByRefType />}
          onClick={() => {
            setVisible("TypeModal", true);
            // gaEvent("open_type_modal"); // Devre dışı bırakıldı
          }}
        >
          Generate Type
        </Menu.Item>
        <Menu.Item fz={12} leftSection={<FaRandom />} onClick={randomizeData}>
          Randomize Data
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

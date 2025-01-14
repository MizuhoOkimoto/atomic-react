import algoliasearch from "algoliasearch";
import debounce from "lodash.debounce";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {LiveProvider, LiveEditor, LiveError, LivePreview} from "react-live";

import * as AtomicReactComponents from "../framework";
import {AList} from "../framework/components/AList";
import LoremIpsum from "../framework/utils/lorem-ipsum";
import AlgoliaLogo from "../framework/utils/algolia.svg";

const scope = {
  ...AtomicReactComponents,
  LoremIpsum,
  useCallback,
  useEffect,
  useRef,
  useState,
  algoliasearch,
  debounce,
  AlgoliaLogo
};

const Playground = ({code, fullWidthPreview, noInline}) => {
  return (
    <LiveProvider code={code} scope={scope} noInline={noInline}>
      <AList
        className={`playground d-flex mb-8${
          fullWidthPreview ? " flex-column playground--full-width-preview" : ""
        }`}
        style={{
          minHeight: 300,
          position: "relative"
        }}>
        {!fullWidthPreview && (
          <>
            <div
              className="overflow-y-scroll black"
              style={{position: "absolute", width: "50%", top: 0, bottom: 0}}>
              <LiveEditor />
            </div>
            <div
              className="pa-4 playground__preview"
              style={{flexBasis: "50%", marginLeft: "50%", maxWidth: "50%"}}>
              <LiveError />
              <LivePreview />
            </div>
          </>
        )}
        {fullWidthPreview && (
          <>
            <div className="pa-4 playground__preview">
              <LiveError />
              <LivePreview />
            </div>
            <div className="overflow-y-scroll black" style={{maxHeight: 300}}>
              <LiveEditor />
            </div>
          </>
        )}
      </AList>
    </LiveProvider>
  );
};

Playground.displayName = "Playground";

export default Playground;

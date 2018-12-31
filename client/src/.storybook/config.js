/*
 * Copyright (c) 2018. Code contained in this file is written by and the
  * intellectual property of Jesse Green except where otherwise noted. Reuse
   * for educational, open source or reference uses is freely available
    * provided reference to the original source is cited with use. Reuse for
     * commercial purposes is prohibited without the consent of the owner.
 */

import { configure } from "@storybook/react";

function loadStories() {
	require('../stories/App');
	require('../stories/Button');
}

configure(loadStories, module);
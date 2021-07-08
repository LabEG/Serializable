export var DefaultValueHandling;
(function (DefaultValueHandling) {
    DefaultValueHandling[DefaultValueHandling["Include"] = 0] = "Include";
    DefaultValueHandling[DefaultValueHandling["Ignore"] = 1] = "Ignore";
    DefaultValueHandling[DefaultValueHandling["Populate"] = 2] = "Populate";
    DefaultValueHandling[DefaultValueHandling["IgnoreAndPopulate"] = 3] = "IgnoreAndPopulate"; // Not supported yet
})(DefaultValueHandling || (DefaultValueHandling = {}));

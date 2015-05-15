/**
 * componentFactory.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 16/12/14
 */
function componentFactory(id, properties) {
    return input => {
        let component = { id };
        properties.forEach(property => {
            if (property.mandatory && input[property.name] === undefined) {
                throw new Error("Attempted to create component \"" + id +
                        "\" without mandatory property \"" + property.name + "\"");
            }
            component[property.name] = input[property.name] === undefined ? property.fallback : input[property.name];
        });
        return component;
    };
}

export default componentFactory;

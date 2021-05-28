package it.istat.graphservice;

import java.io.IOException;
import java.io.Writer;

import org.thymeleaf.Arguments;
import org.thymeleaf.dom.Comment;
import org.thymeleaf.dom.Element;
import org.thymeleaf.dom.Node;
import org.thymeleaf.dom.Text;
import org.thymeleaf.templatewriter.AbstractGeneralTemplateWriter;

public class SkipSpaceLineXhtmlHtml5TemplateWriter extends AbstractGeneralTemplateWriter {

    @Override
    protected boolean shouldWriteXmlDeclaration() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    protected boolean useXhtmlTagMinimizationRules() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    protected void writeText(final Arguments arguments, final Writer writer, final Text text)
            throws IOException {
        //      char[] contents = text.unsafeGetContentCharArray();
        //     String contentString = new String(contents);
        //		 String contentString = text.getContent();
        final char[] textChars = text.getContent().toCharArray();
        String contentString = new String(textChars);
        if (contentString != null && !contentString.isEmpty() && contentString.trim().length() == 0) {
            return;
        } else {
            super.writeText(arguments, writer, text);
        }
    }

    @Override
    public void writeNode(final Arguments arguments, final Writer writer, final Node node)
            throws IOException {
        super.writeNode(arguments, writer, node);
        if (node instanceof Element) {
            writer.write("\n");
        } else if (node instanceof Comment) {
            writer.write("\n");
        }

    }
}

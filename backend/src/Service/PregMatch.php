<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\PregResponse;
use App\Resource\Flags;

/**
 * Handler form preg_match() function.
 * @see preg_match()
 */
class PregMatch extends PregFunction
{
    protected array $availableFlags = [Flags::PREG_OFFSET_CAPTURE, Flags::PREG_UNMATCHED_AS_NULL];

    public function exec(): PregResponse
    {
        $ret = preg_match($this->dto->pattern, $this->dto->subject, $matches, $this->flags, $this->dto->offset ?? 0);

        return new PregResponse(
            $matches,
            $this->syntax(),
            ...$this->result($ret)
        );
    }

    protected function syntax(): string
    {
        $method = $this->dto->method->value;
        $args = [$method .'("'. $this->dto->pattern.'"'];

        $args[] = $this->cropString($this->dto->subject);
        $args[] = '$matches';

        if (\count($this->flagsStr)) {
            $args[] = implode(' | ', $this->flagsStr);
        }

        if (!\is_null($this->dto->offset)) {
            $args[] = (!\count($this->flagsStr)? 'null, ': ''). $this->dto->offset;
        }

        $code = implode(", ", $args). ");";

        return $this->syntaxCleanup($code);
    }
}